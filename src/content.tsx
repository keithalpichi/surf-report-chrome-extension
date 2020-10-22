import * as React from 'react'
import * as ReactDOM from 'react-dom'
import './styles.css'
import * as dayjs from 'dayjs'
import { classNames } from './utils'
import { Location, AppError } from './models'

const mountNode = document.getElementById('app')

type CardProps = {
  color?: 'main' | 'secondary' | 'active' | 'inherit'
  className?: string
  title?: string
  onClick?: () => void
}

function Card (props: React.PropsWithChildren<CardProps>) {
  let color = 'bg-white'
  if (props.color !== undefined) {
    if (props.color === 'secondary') {
      color = 'bg-gray-200'
    } else if (props.color === 'active') {
      color = 'bg-teal-500'
    } else if (props.color === 'inherit') {
      color = 'bg-transparent'
    }
  }
  return (
    <div
      className={classNames('rounded-lg', color, props.className, { 'hover:cursor-pointer': props.onClick !== undefined })}
      onClick={props.onClick}
    >
      {props.title && <h2 className={classNames('text-xl p-3 rounded-tl-lg rounded-tr-lg bg-blue-800 text-white')}>{props.title}</h2>}
      {props.children}
    </div>
  )
}

function LocationCards (props: React.PropsWithChildren<{className: string}>) {
  return (
    <div className={classNames('rounded-lg bg-transparent flex flex-col', props.className)}>
      <h2 className={classNames('text-xl p-3 rounded-tl-lg rounded-tr-lg bg-blue-800 text-white')}>Locations</h2>
      <div className={classNames('overflow-y-scroll flex flex-col flex-grow flex-basis-0')}>
        {props.children}
      </div>
    </div>
  )
}

type LocationCardProps = Pick<CardProps, 'className'> & {
  name: string
  active?: boolean
}
function LocationCard (props: React.PropsWithChildren<LocationCardProps>) {
  return (
    <Card
      className='location-card my-2'
      color={props.active ? 'active' : undefined}
      onClick={console.log.bind(null, 'card clicked')}
    >
      <p className='text-white text-center text-xl'>{props.name}</p>
      {props.children}
    </Card>
  )
}

type ModalProps = {
  visible: boolean
  close: () => void
}
function Modal (props: React.PropsWithChildren<ModalProps>) {
  if (!props.visible) {
    return null
  }
  return (
    <div className='h-screen w-screen top-0 left-0 fixed z-50' style={{ background: 'rgba(0,0,0,.75)' }} id='modal-parent' onClick={props.close}>
      <div className='bg-white rounded-lg grid flex-column my-40 mx-auto max-w-2xl p-3 relative' id='modal-child' onClick={e => e.stopPropagation()}>
        {props.children}
      </div>
    </div>
  )
}

function App () {
  const [_, updateSearchTerm] = React.useState<string>('')
  const [modalVisible, updateModalVisibility] = React.useState<boolean>(false)
  const [error, setError] = React.useState<AppError | null>(null)
  const [location, setLocation] = React.useState<Location | null>(null)
  navigator.geolocation.getCurrentPosition(
    (pos: Position) => setLocation(new Location({ coordinates: pos.coords })),
    (posError: PositionError) => {
      switch (posError.code) {
        case 1:
          setError(new AppError({ id: 'PERMISSION_DENIED', message: 'User denied permission to access geolocation' }))
          break
        case 2:
          setError(new AppError({ id: 'POSITION_UNAVAILABLE', message: 'Browser failed to retrieve the user\'s geolocation' }))
          break
        case 3:
          setError(new AppError({ id: 'TIMEOUT', message: 'Request for user\'s geolocation timed out' }))
          break
        default:
          break
      }
    }
  )
  const handleSearchUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateSearchTerm(e.target.value)
  }
  return (
    <div className='app min-h-screen min-w-screen'>
      <Modal visible={modalVisible} close={() => updateModalVisibility(false)}>
        <div className='grid flex-column'>
          <h1 className='font-sans text-2xl text-center'>Find a Spot</h1>
          <form className='w-full rounded-md border'>
            <input
              className='w-full rounded-md p-3'
              placeholder='City or beach'
              maxLength={25}
              type='search'
              onChange={handleSearchUpdate}
            />
          </form>
          <button onClick={() => updateModalVisibility(false)}>X</button>
        </div>
      </Modal>
      <h1 className='sm:col-span-12 md:col-span-2 font-sans font-bold text-4xl text-white'>Surf Report</h1>
      <p className='sm:col-span-12 md:col-span-8 text-center font-sans text-2xl text-white'>{dayjs().format('dddd, MMMM D, YYYY h:mm A')}</p>
      <button
        className='sm:col-span-12 md:col-span-2 transition-colors duration-100 ease-in-out text-gray-600 py-2 pr-4 pl-4 block w-full appearance-none leading-normal border border-transparent rounded-lg focus:outline-none text-left select-none truncate focus:bg-white focus:border-gray-300 bg-gray-200'
        onClick={() => updateModalVisibility(true)}
      >
        <svg width='20' height='20' className='inline mr-2' viewBox='0 0 20 20'><path d='M14.386 14.386l4.0877 4.0877-4.0877-4.0877c-2.9418 2.9419-7.7115 2.9419-10.6533 0-2.9419-2.9418-2.9419-7.7115 0-10.6533 2.9418-2.9419 7.7115-2.9419 10.6533 0 2.9419 2.9418 2.9419 7.7115 0 10.6533z' stroke='currentColor' fill='none' fillRule='evenodd' strokeLinecap='round' strokeLinejoin='round'></path></svg>
        <span>
          Find a Spot
        </span>
      </button>
      <LocationCards className='col-span-2 row-start-2 row-end-5'>
        <LocationCard name='San Diego' active></LocationCard>
        <LocationCard name='San Diego'></LocationCard>
        <LocationCard name='San Diego'></LocationCard>
        <LocationCard name='San Diego'></LocationCard>
        <LocationCard name='San Diego'></LocationCard>
        <LocationCard name='San Diego'></LocationCard>
        <LocationCard name='San Diego'></LocationCard>
        <LocationCard name='San Diego'></LocationCard>
        <LocationCard name='San Diego'></LocationCard>
        <LocationCard name='San Diego'></LocationCard>
      </LocationCards>
      <Card className='col-span-5' title='Map'></Card>
      <Card className='col-span-5' title='Tide'></Card>
      <Card className='col-span-5' title='Wind'></Card>
      <Card className='col-span-5' title='Sunset & Sunrise'></Card>
      <Card className='col-span-5' title='Temperature'></Card>
      <Card className='col-span-5' title='Surf Height'></Card>
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
, mountNode)
