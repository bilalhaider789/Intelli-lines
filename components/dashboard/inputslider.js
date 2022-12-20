import dynamic from 'next/dynamic'

// const ComponentWithNoSSR = dynamic(
//     () => import('../dashboard/inputslider'),
//     { ssr: false }
//   )
  
  function Inputslider() {
    return (
    //   <div><ComponentWithNoSSR/><p>HELLO WORLD!</p></div>
    <div>hello</div>
    )
  }

  export default Inputslider;