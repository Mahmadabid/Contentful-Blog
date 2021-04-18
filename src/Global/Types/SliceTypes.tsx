export interface ThemeState {
    value: boolean;
}

export interface LogInState {
    value: boolean;
}

export interface userState {
    name: string;
    picture: string;
}

export interface State {
    themes: ThemeState;
    LogIn: LogInState;
    user: userState;
}