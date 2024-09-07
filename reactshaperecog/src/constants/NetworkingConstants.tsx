export const NetworkingConstants = 
{
    ONLY_USE_DEFAULT_PORT : true,  // for if we want to try to connect to "n" repeaters
    MINIMUM_REPEATER_PORT : 3004,  // min port (default) to connect to
    MAXIMUM_REPEATER_PORT : 3005  // max port to connect to
} as const;
