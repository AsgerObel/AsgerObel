
import testImg from '../assets/test3.png'

const TheStart = () => {
  return (
    <section
      id="thestart"
      className="w-full flex items-center justify-center"
      style={{ minHeight: '70vh', padding: '8% 6%' }}
    >
      <img
        src={testImg}
        alt="Welcome"
        className="w-full h-auto rounded-[24px] object-cover"
        style={{ maxHeight: '60vh' }}
      />
    </section>
  )
}

export default TheStart
