import {Environment} from './common.model';

export interface ApiOption {
  /**
   * @field allow_anonymous
   * @description allow connect api not secure
   */
  allow_anonymous?: boolean;

  /**
   * @field allow_widget
   * @description allow connect api function widget
   */
  skip_verify_session?: boolean;

  /**
   * @field roles
   * @description config roles access api
   */
  roles?: string | string[];

  /**
   * @field prevent_roles
   * @description config role specified prevent
   */
  prevent_roles?: string | string[];

  /**
   * @field env
   * @description apply api execute for environment
   */
  env?: Environment[]
}
