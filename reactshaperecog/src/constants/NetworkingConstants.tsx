export const NetworkingConstants = 
{
    ONLY_USE_DEFAULT_PORT : true,  // for if we want to try to connect to "n" repeaters
    MINIMUM_REPEATER_PORT : 3004,  // min port (default) to connect to
    MAXIMUM_REPEATER_PORT : 3005,  // max port to connect to
    MINIMUM_LINUX_REPEATER_PORT: 4004,
    MAXIMUM_LINUX_REPEATER_PORT: 4005,
    BIG_DOME_IP: "10.232.64.22",
    CDR_IP: "10.232.67.10",
    NEW_VM_BIG_DOME_IP: "10.232.64.72"
} as const;
