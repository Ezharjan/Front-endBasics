////Basic state machine of the engine
const State = {
    loading: 0,
    started: 1,
    updating: 2,
    rendering: 3,
    destroyed: 4,
    connecting: 5,
    connected: 6,
    timeout: 7,
    disconnected: 8,
    restarted: 9,
    reloading: 10,
    reloaded: 11,
    paused: 12,
    crashed: 13,
};