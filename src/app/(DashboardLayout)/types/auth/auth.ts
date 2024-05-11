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

export interface forgotPassword {
  email?: string;
  submit: Function,
  setEmail: Function
}

export interface resetPassword {
  new_password?: string;
  confirm_password?: string;
  setNewPassword: Function,
  setConfirmPassword: Function,
  submit: Function,
}

export interface signInType {
  title?: string;
}
