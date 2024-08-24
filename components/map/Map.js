import dynamic from 'next/dynamic';

const GisMap = dynamic(() => import('./DynamicMap'), {
  ssr: false
});

// Set default sizing to control aspect ratio which will scale responsively
// but also help avoid layout shift

const Map = (props) => {
  return (
    <div>
      <GisMap />
    </div>
  )
}

export default Map;
