import { useCallback, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import {
  CustomerListInterface,
  GetAllCustomerResponseInterface,
} from "@interfaces/response-interfaces/customer/get-all-customer-response-interface"
import {
  CustomerDniTypeInterface,
  GetAllTypeDNIResponseInterface,
} from "@interfaces/response-interfaces/customer/get-all-type-DNI-response-interface"
import { GetCustomer } from "@api/customer/customer/get-customer/page"
import { GetTypeDni } from "@api/customer/type-DNI/get-type-DNI/page"

export const useClientSearchLogic = () => {
  const { t } = useTranslation()

  const [idTypes, setIdTypes] = useState<CustomerDniTypeInterface[]>([])
  const [loading, setLoading] = useState(false)
  const [isAffiliated, setIsAffiliated] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<CustomerListInterface[]>([])
  const [formData, setFormData] = useState({
    idType: "",
    idNumber: "",
  })

  const [customer, setCustomer] = useState<CustomerListInterface | null>(null)

  const fetchIdTypes = useCallback(async () => {
    setLoading(true)
    try {
      const response = (await GetTypeDni({
        id: "",
        name: "",
        alias: "",
        longitude: "",
        status: true,
        idMethodValidation: "",
        nameMethodValidation: "",
        idUser: "",
        dataType: "",
        size: 100,
        page: 0,
      })) as GetAllTypeDNIResponseInterface

      if (response.correct && response.object && response.object.list?.length > 0) {
        setIdTypes(response.object.list)
      } else {
        setError(t("msj_no_id_types_found_or_invalid_response"))
      }
    } catch (err) {
      setError(t("msj_error_getting_id_types" + err))
    } finally {
      setLoading(false)
    }
  }, [t])

  useEffect(() => {
    fetchIdTypes()
  }, [fetchIdTypes])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    setResult([])
    setIsAffiliated(true)
  }

  const handleSubmitForm = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    setLoading(true)
    setError(null)
    setResult([])

    try {
      const response = (await GetCustomer({
        idTypeCustomer: formData.idType,
        dni: formData.idNumber,
      })) as GetAllCustomerResponseInterface

      if (
        response.correct &&
        response.object &&
        Array.isArray(response.object.list) &&
        response.object.list.length > 0
      ) {
        const customerData = response.object.list[0]

        if (customerData) {
          setIsAffiliated(true)
          setCustomer({
            ...customerData,
            idTypeCustomer: formData.idType,
            dni: formData.idNumber,
            id: customerData.id || "",
          })
          setResult(response.object.list)
        }
      } else {
        setIsAffiliated(false)
        setCustomer(null)
      }
    } catch (error) {
      console.error("Error fetching customer:", error)
      setError(t("msj_error_fetching_customer"))
    } finally {
      setLoading(false)
    }
  }

  return {
    idTypes,
    loading,
    error,
    result,
    formData,
    handleInputChange,
    handleSubmitForm,
    isAffiliated,
    customer,
  }
}
