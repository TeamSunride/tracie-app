# REFERENCE

*Useful information for the TRACIE app.*

## Data

Data is sent in a JSON format, with the following structure:

```json
{
    "o": OPCODE,
    "d": DATA,
    "t": TIMESTAMP
}
```

### OPCODE

Indicates which operation is being carried out. Number.

### DATA

JSON format of the data being sent in the current packet. Object.

### TIMESTAMP

UNIX timestamp (milliseconds) of when the packet was transmitted by the server. Number.



npx expo start --dev-client

npx expo run:ios --device
