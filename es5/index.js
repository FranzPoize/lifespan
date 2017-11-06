import Lifespan from './Lifespan';
import lifespan from './lifespanDecorator';
Object.assign(Lifespan, {
  lifespan: lifespan
});
export { lifespan };
export default Lifespan;