# Continuous Bandwidth Tester

A self-hosted browser bandwidth tester that runs until Stop is pressed.

## Run it
1. Install Node.js 18+.
2. In this folder run:
   npm install
   npm start
3. Open http://localhost:3000

For a real internet/mobile-data test, host the Node server on a machine/VPS reachable from the device. The traffic between the phone and that server is real network traffic and can count toward the carrier's data allowance.

## Important
This is a bandwidth/data-consumption tester, not a way to obtain free or unlimited mobile data. The server generates disposable bytes and discards uploads; it does not store the test payloads.
