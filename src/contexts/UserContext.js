"use client"
import { createContext, useContext, useState, useEffect } from "react"
import { useUser } from "@clerk/nextjs"
import axios from "axios"

const UserContext = createContext()

export function UserProvider({ children }) {
  const { user, isLoaded } = useUser()
  console.log('user',user);
  
  const [phoneNumber, setPhoneNumber] = useState(null)
  const [instituteData, setInstituteData] = useState(null)
  const [isInstituteLoaded, setIsInstituteLoaded] = useState(false)

  useEffect(() => {
    if (isLoaded && user) {
      // const userPhoneNumber = user.primaryPhoneNumber?.phoneNumber
      const userPhoneNumber = user.phoneNumbers[0]?.phoneNumber
      setPhoneNumber(userPhoneNumber)
      fetchInstituteData(userPhoneNumber)
    }
  }, [isLoaded, user])

  const fetchInstituteData = async (phone) => {
    try {
      const response = await axios.get(`/api/institutes?key=phoneNumber&value=${phone}`)
      setInstituteData(response.data)
    } catch (error) {
      console.error("Error fetching institute data:", error)
      setInstituteData(null)
    } finally {
      setIsInstituteLoaded(true)
    }
  }

  return (
    <UserContext.Provider
      value={{ phoneNumber, instituteData, isLoaded, isInstituteLoaded }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUserContext() {
  return useContext(UserContext)
}
