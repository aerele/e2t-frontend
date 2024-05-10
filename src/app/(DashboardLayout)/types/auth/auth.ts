export interface registerType {
  title?: string;
  subtitle?: JSX.Element | JSX.Element[];
  subtext?: JSX.Element | JSX.Element[];
  name:string,
  email:string,
  password:string,
  setName: Function,
  setEmail: Function,
  setPassword: Function,
  submit: Function
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
