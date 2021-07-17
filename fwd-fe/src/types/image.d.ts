declare module '*.component.svg' {
  import { ComponentType } from 'react';

  const content: ComponentType<React.HTMLAttributes<React.ReactSVGElement>>;
  export default content;
}

declare module '*.svg' {
  const content: string;
  export default content;
}
declare module '*.png' {
  const content: string;
  export default content;
}
