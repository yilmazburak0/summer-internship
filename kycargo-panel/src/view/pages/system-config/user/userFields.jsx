import { useEffect, useState } from "react";

import { Space, Tag } from "antd";
import userRole from "enums/user";
import { inputTypes, gridTypes } from "helpers/inputRenderer";
import { useDispatch, useSelector } from "react-redux";
import { getEUCountries, setSelectedCountry } from "redux/countries/countryActions";
import apiUrl from "service/apiURL";


function renderOrNot(role, userRole) {
    return role ? role.includes(userRole) : true
}
const userFields = [
    {
        title: "Kullanıcı Adı",
        dataIndex: "firstName",
        key: "firstName",
        render: (text) => <a href="#">{text}</a>,
        componentType: inputTypes.TEXT_INPUT,
        gridType: gridTypes.HALF_WIDTH,
        editable: true,
        required: true,
        value: ''
    },

    {
        title: "Kullanıcı Soyadı",
        dataIndex: "lastName",
        key: "lastName",
        render: (text) => <a href="#">{text}</a>,
        componentType: inputTypes.TEXT_INPUT,
        gridType: gridTypes.HALF_WIDTH,
        editable: true,
        required: true,
        value: ''
    },
    {
        title: "TC Kimlik Numarası",
        dataIndex: "passaport",
        key: "passaport",
        componentType: inputTypes.NUMERIC_INPUT,
        gridType: gridTypes.HALF_WIDTH,
        editable: true,
        required: true,
        value: ""
    },
    {
        title: "Doğum Tarihi",
        dataIndex: "dateOfBird",
        key: "dateOfBird",
        componentType: inputTypes.NUMERIC_INPUT,
        gridType: gridTypes.HALF_WIDTH,
        editable: true,
        required: true,
        value: ""
    },
    {
        title: "Telefon",
        dataIndex: "phone",
        key: "phone",
        componentType: inputTypes.NUMERIC_INPUT,
        gridType: gridTypes.HALF_WIDTH,
        editable: true,
        required: true,
        value: ""
    },
    {
        title: "Kullanıcı Email",
        dataIndex: "email",
        key: "email",
        componentType: inputTypes.TEXT_INPUT,
        gridType: gridTypes.HALF_WIDTH,
        editable: true,
        role: [userRole.ADMIN, userRole.DEVELOPER],
        required: true,
        value: ""
    },
    {
        title: "Ülke",
        dataIndex: "country",
        key: "country",
        keyboardType: "text",
        componentType: inputTypes.DROPDOWN,
        gridType: gridTypes.HALF_WIDTH,
        onChange: (data) => { },
        editable: true,
        options: [],
        value: null
    },
    {
        title: "İl",
        dataIndex: "city",
        key: "city",
        keyboardType: "text",
        componentType: inputTypes.DROPDOWN,
        gridType: gridTypes.HALF_WIDTH,
        editable: true,
        options: [],
        value: ""
    },
    {
        title: "Adres",
        dataIndex: "address",
        key: "address",
        keyboardType: "text",
        componentType: inputTypes.TEXT_INPUT,
        gridType: gridTypes.HALF_WIDTH,
        editable: true,
        value: ""
    },
    {
        title: "Posta Kodu",
        dataIndex: "zipcode",
        key: "zipcode",
        keyboardType: "numeric",
        componentType: inputTypes.NUMERIC_INPUT,
        gridType: gridTypes.HALF_WIDTH,
        editable: true,
        value: ""
    },

];
export default function useGetInputFields() {

    const dispatch = useDispatch()
    const [inputFields, setInputFields] = useState(userFields)
    const { euCountries } = useSelector(s => s.country)
    const { user } = useSelector(s => s.auth)

    const countryField = inputFields.find(field => field.dataIndex == 'country')
    const columns = inputFields.filter(c => c.colVisible !== false && renderOrNot(c?.role, user.role))

    useEffect(() => {

        dispatch(getEUCountries())

    }, [])

    useEffect(() => {
        countryField.options = euCountries?.map((el) => ({ label: el.name, value: el.name, key: el._id }))
        countryField.onChange = (name) => {
            const cityField = inputFields.find(field => field.dataIndex == 'city')
            const states = euCountries.find(c => c.name === name)?.states
            cityField.options = states?.map((el) => ({ label: el.name, value: el.name, key: el._id }))
            setInputFields([...inputFields])
        }

        setInputFields([...inputFields])

    }, [euCountries])

    return { inputFields, columns }
}
