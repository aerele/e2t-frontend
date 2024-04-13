export interface registerType {
  title?: string;
  subtitle?: JSX.Element | JSX.Element[];
  subtext?: JSX.Element | JSX.Element[];
}

export interface loginType {
  title?: string;
  subtitle?: JSX.Element | JSX.Element[];
  subtext?: JSX.Element | JSX.Element[];
  username:string,
  password: string,
  setUsername: Function,
  setPassword: Function,
  submit: Function
}

export interface signInType {
  title?: string;
}
