/* eslint-disable no-unused-vars */
const socketServer = require('socket.io');
const jwt = require('jsonwebtoken');

const User = require('models/User');
// const Message = require('models/Message')
// const Notification = require('models/Notification')
// const Reservation = require('models/Reservation')

const oneSignal = require('utils/oneSignal');

module.exports = async (app, http) => {
  const io = socketServer(http, {
    path: '/websocket',
    pingInterval: 5000,
    pingTimeout: 100000,
  });

  global.globalSocketIo = io;

  io.on('connection', (socket) => {
    const socketId = socket.id;
    let userId;

    global.globalSocket = socket;

    let token = null;
    const authorization = socket.handshake.query.authorization || socket.handshake.headers.Authorization;

    // console.log(authorization)

    if (authorization && authorization.startsWith('Bearer ')) {
      token = authorization.split(' ')[1];
    }

    // Make sure token exists
    if (!token) {
      // console.log('Not authorized to access this route')
      socket.disconnect(0);
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      User.findById(decoded.id)
        .exec()
        .then((user) => {
          if (user.status !== 'active') {
            // console.log('Not authorized to access this route')
            socket.disconnect(0);
          }
          userId = user._id;

          user.socketSessionId = socketId;

          user.save();
        });
    } catch (err) {
      // console.log('Not authorized to access this route')
      socket.disconnect(0);
    }

    // console.log('a user connected', socket.id)

    socket.on('disconnect', () => {
      User.findById(userId)
        .exec()
        .then((user) => {
          user.socketSessionId = null;
          user.save();
        });

      // console.log('a user disconnected', socketId)
    });

    socket.on('start-chat', ({reservationId}) => {
      // const senderId = userId
      // Reservation
      //   .findById(reservationId)
      //   .populate('travel', 'createdBy')
      //   .exec()
      //   .then(reservation => {
      //     // if (!reservation) {
      //     //   console.log('no reservation found in start-chat')
      //     // }
      //     const receiverId = (reservation.createdBy === senderId) ? reservation.travel.createdBy : reservation.createdBy
      //     // console.log('reservation.createdBy', reservation.createdBy)
      //     // console.log('reservation.travel.createdBy', reservation.travel.createdBy)
      //     // console.log('senderId', senderId)
      //     // console.log('receiverId', receiverId)
      //     Message.find({ reservation: reservationId }).sort('-createdAt').exec().then(messages => {
      //       // console.log('messages')
      //       // console.log(messages)
      //       User.findById(receiverId).select('socketSessionId').exec().then(receiver => {
      //         const receiverSocketSessionId = receiver.socketSessionId
      //         if (receiverSocketSessionId) {
      //           if (io.sockets.connected[receiverSocketSessionId]) {
      //             // console.log('receiverSocketSessionId', receiverSocketSessionId)
      //             socket.broadcast.to(receiverSocketSessionId).emit('start-chat', { data: messages })
      //           } else {
      //             receiver.socketSessionId = null
      //             receiver.save()
      //           }
      //         }
      //         // console.log('socketId', socketId)
      //         socket.emit('start-chat', { data: messages })
      //       })
      //     })
      //   })
    });

    // socket.on('start-chat', ({ senderId, receiverId }) => {
    //   console.log(senderId, receiverId)
    //   Message.find({ sentBy: senderId, sentTo: receiverId }).sort('-createdAt').exec().then(messages => {
    //     console.log('messages')
    //     console.log(messages)
    //     User.findById(receiverId).select('socketSessionId').exec().then(receiver => {
    //       const receiverSocketSessionId = receiver.socketSessionId

    //       if (receiverSocketSessionId) {
    //         socket.broadcast.to(receiverSocketSessionId).emit('start-chat', { data: messages })
    //       }
    //       console.log('socketId', socketId)
    //       socket.emit('start-chat', { data: messages })
    //     })
    //   })
    // })

    socket.on('end-chat', () => {
      // geçmiş bütün mesajları gönder
    });

    socket.on('read-message', (messageId) => {
      // // console.log(messageId)
      // Message.findByIdAndUpdate(messageId, {readAt: new Date().toISOString()}, {new: true}).then((msg) => {
      //   // console.log('msg:', msg._id, msg.isRead)
      // });
    });

    socket.on('chat-message', (message) => {
      // // console.log('received message: ')
      // // console.log(message)
      // Message.create(message).then((msg) => {
      //   User.findById(msg.sentTo)
      //     .select('socketSessionId')
      //     .exec()
      //     .then((receiver) => {
      //       const receiverSocketSessionId = receiver.socketSessionId;
      //       if (receiverSocketSessionId) {
      //         if (io.sockets.connected[receiverSocketSessionId]) {
      //           socket.broadcast.to(receiverSocketSessionId).emit('chat-message', {data: msg});
      //         } else {
      //           receiver.socketSessionId = null;
      //           receiver.save();
      //         }
      //       }
      //       socket.emit('chat-message', {data: msg});
      //       User.findById(msg.sentBy)
      //         .select('profile.firstName profile.lastName')
      //         .exec()
      //         .then((sender) => {
      //           try {
      //             oneSignal.sendPushNotification('new-message', [receiver._id.toString()], {
      //               senderFullName: sender.fullName,
      //               reservationId: msg.reservation,
      //               messageId: msg._id,
      //             });
      //           } catch (error) {
      //             console.error('socket send push notification error: ', error);
      //             // return next(new ErrorResponse('Error in sending push notification', 500))
      //           }
      //         });
      //     });
      // });
    });

    socket.on('read-notification', ({notificationId}) => {
      // // console.log('notificationId', notificationId)
      // Notification.findByIdAndUpdate(notificationId, {readAt: new Date().toISOString()}, {new: true}).then((notif) => {
      //   return true;
      // });
    });

    // socket.on('get-notifications', {} => {

    // })
  });
};
