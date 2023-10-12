import { useSelector } from "react-redux"
import { Col, Form, Input, InputNumber, Select, DatePicker } from "antd";

const inputTypes = {
    TEXT_INPUT: 1,
    DROPDOWN: 2,
    DATETIME: 3,
    MULTIAUTOCOMPLETE: 4,
    AUTOCOMPLETE: 5,
    TEXTAREA: 6,
    NUMERIC_INPUT: 7,
    SEPARATOR: 8,
    MULTIPLE_SELECTION:9,
}
const gridTypes = {
    QUARTER_WİDTH: 6,
    HALF_WIDTH: 12,
    FULL_WIDTH: 24,
}
Object.freeze(inputTypes)
Object.freeze(gridTypes)
export { inputTypes, gridTypes }

import moment from "moment";
import CustomSelect from "view/components/custom/CustomSelect";

export default function inputRenderer(inputField, passedProps) {
    const { user, signInError } = useSelector(s => s.auth)
    let { role, inputVisible, componentType, gridType, options, required, dataIndex, title, editable, apiUrl } = inputField
    const renderOrNot = role ? role.includes(user.role) : true

    if (renderOrNot && inputVisible != false) {
        switch (componentType) {
            case inputTypes.TEXT_INPUT:
                return (
                    <Col span={gridType} >
                        <Form.Item label={title} name={dataIndex} rules={[{ required: required, message: `${title} alanı boş bırakılamaz!` }]} >
                            <Input
                                allowClear
                                disabled={!editable}
                                placeholder={required ? `*${title}` : title}
                            />
                        </Form.Item>

                    </Col>
                )
            case inputTypes.NUMERIC_INPUT:
                return (
                    <Col span={gridType} >
                        <Form.Item label={title} name={dataIndex} rules={[{ required: required, message: `${title} alanı boş bırakılamaz!` }]} >
                            <InputNumber
                                style={{ width: '100%' }}
                                min={0}
                                disabled={!editable}
                                placeholder={required ? `*${title}` : title}
                            />
                        </Form.Item>

                    </Col>
                )
            case inputTypes.DROPDOWN:
                return (
                    <Col span={gridType} >
                        <Form.Item label={title} name={dataIndex} rules={[{ required: required, message: `${title} alanı boş bırakılamaz!` }]} >
                            <Select
                                showSearch
                                allowClear
                                placeholder={required ? `*${title}` : title}
                                disabled={!editable}
                                options={options}
                                onChange={inputField?.onChange}
                            //apiUrl={apiUrl}
                            />
                        </Form.Item>

                    </Col>
                )
            case inputTypes.MULTIPLE_SELECTION:
                return (
                    <Col span={gridType} >
                        <Form.Item label={title} name={dataIndex} rules={[{ required: required, message: `${title} alanı boş bırakılamaz!` }]} >
                            <Select
                                mode="multiple"
                                allowClear
                                style={{ width: '100%' }}
                                placeholder="Please select"
                                // defaultValue={['a10', 'c12']}
                                onChange={inputField?.onChange}
                                options={options}
                            />
                        </Form.Item>

                    </Col>
                )
            case inputTypes.DATETIME:
                return (
                    <Col span={gridType} >
                        <Form.Item
                            label={title}
                            name={dataIndex}
                            rules={[{ required: required, message: `${title} alanı boş bırakılamaz!` }]}
                            getValueFromEvent={val => new Date(val)}
                            getValueProps={(i) => ({ value: i && moment(i) })}
                        >
                            <DatePicker
                                style={{ width: '100%' }}
                                format={'DD.MM.YYYY'}
                                allowClear
                                disabled={!editable}
                                placeholder={required ? `*${title}` : title}
                            />
                        </Form.Item>

                    </Col>
                )
            default:
                return;
        }
    }
}


