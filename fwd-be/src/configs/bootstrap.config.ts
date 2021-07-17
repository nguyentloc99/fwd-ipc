import {registerExtensionMethods} from '../libs/common/exmethod';

function preloadExtensionMethods() {
  registerExtensionMethods({pagination: true, response: true});
}

export default function () {
  preloadExtensionMethods();
}
