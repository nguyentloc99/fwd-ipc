import {router} from '../../libs/standard';
import ForwardRequest from '../forward.request';

router.post('/getProduct', ForwardRequest.post, {
  allow_anonymous: true
});

export default '/getProduct';