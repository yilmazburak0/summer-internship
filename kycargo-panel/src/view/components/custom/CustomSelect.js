import { Select } from 'antd'
import { authHeader } from 'helpers/auth'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { axiosClient } from 'service'

function CustomSelect(props) {

    const [options, setOptions] = useState(props.options || [])
    async function fetcher() {

        const response = await (await axiosClient.get(props.apiUrl, authHeader())).data
        console.log("res", response);
        if (!response.error) {
            const options = response?.map((el) => ({ label: el.name, value: el.name, key: el._id }))
            console.log(options);
            setOptions(options)
        }
    }
    useEffect(() => {
        if (props?.apiUrl) {
            fetcher()
        }

    }, [])

    return (
        <Select
            showSearch
            {...props}
            options={options}
        />
    )
}

export default CustomSelect
