💧 Smart Water Treatment Web Dashboard

A professional Next.js-based IoT dashboard for real-time monitoring and control of Ultra-Filtration (UF) water treatment systems


.
🚀 Key Features


Tri-Mode Connectivity: Switch between API Mode (remote), Serial Mode (direct hardware), and Simulation Mode (testing)
.
Real-time IoT Telemetry: Live visualization of TDS, Flow Rate, and Pressure
.
Hardware Control: Direct pump and mode switching (Manual/AI) via the dashboard
.
Responsive Dashboard: Optimized for desktop, tablet, and mobile viewing
.




🛠️ Tech Stack





Frontend: Next.js 14, React, TypeScript, Tailwind CSS, Bootstrap 5.3
.

Communication: Web Serial API for low-latency browser-to-ESP32 links
.

Backend: Laravel-based REST API
.






📂 Project Structure

├── app/

│   ├── (pages)/

│   │   ├── prototype/     # Real-time monitoring demo [16]

│   │   ├── sensors/       # Analytics and history [16]

│   │   ├── control/       # Pump/System operation [18]

│   │   └── ai/            # Predictive analytics [2]

│   ├── layout.tsx         # Responsive architecture [7]

│   └── page.tsx           # Landing page

├── Interfaces/            # TypeScript type definitions [7]

├── hooks/                 # Custom hardware/data hooks [7]

└── components/            # Shared UI elements [7]







🔌 Hardware Requirements




To use the Serial Mode, the following hardware is required:
ESP32 Microcontroller
.

Sensors: TDS Module, Pressure Transducer, and Flow Meter
.

Relay Module: For water pump control
.

USB Data Cable: (Baud rate set to 115200)
.




🌐 Browser Compatibility

This project utilizes the Web Serial API, which requires a modern browser:
Google Chrome 89+


.
Microsoft Edge 89+





.
🛠️ Getting Started



Clone the repo: git clone https://github.com/AKIRA9993/Smart-Water-Station.git

Install dependencies: npm install

Run the development server: npm run dev

Open http://localhost:3000
.

