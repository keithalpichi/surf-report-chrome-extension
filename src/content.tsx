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

function App () {
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
  return (
    <div className='app min-h-screen min-w-screen'>
      <h1 className='col-span-8 font-sans font-bold text-4xl text-white'>Surf Report</h1>
      <h2 className='col-span-4 font-sans text-2xl text-white text-right'>{dayjs().format('dddd, MMMM D, YYYY h:mm A')}</h2>
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
