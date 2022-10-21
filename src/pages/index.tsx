import React, { ReactText, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AddLeagueModal from '../components/AddLeagueModal'
import AddTicketModal from '../components/AddTicketModal'
import Layout from '../components/layout'
import MainHeading from '../components/main-heading/main-heading'
import TicketGridView from '../components/TicketGridView'
import IBaseProps from '../interfaces/IBaseProps'
import { useRoleStore } from '../store'
import { useStep } from '../store/store'


export interface IHomeProps extends IBaseProps {
  isAdmin?: boolean;
}

const Home : React.FC<IHomeProps> = (props: IHomeProps) => {
  
  const {isAdmin, setIsAdmin} = useRoleStore(store=>store);

  const {role, id} = useParams()

  useEffect(()=>{

    if (role == 'admin' && id == 'cgrewon'){
      setIsAdmin(true);
    } else {
      setIsAdmin(false)
    }
    
    
  }, [role, id])
  
  const setStep = useStep((store) => store.setStep)


  useEffect(() => {
    setStep(1)
  }, [setStep])

  return (
    <Layout>
      <MainHeading />
      <TicketGridView />
      <AddLeagueModal />
      <AddTicketModal />
    </Layout>
  )
}

export default Home
