import Loadable from 'react-loadable'
import Loading from '../Loading'

const AsyncEchartsForReact = Loadable({
  loader: () => import(/* webpackChunkName: "echarts-for-react" */ 'echarts-for-react'),
  loading: Loading,
})
export default AsyncEchartsForReact
