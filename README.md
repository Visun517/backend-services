# 🏗️ Backend Microservices Platform

> **Core Infrastructure Super-Repository** for the Capstone Microservices Architecture — Service Discovery, Centralized Configuration, and API Gateway.

---

## 📋 Student & Submission Details

| Field | Details |
|---|---|
| **Student Name** | Visun Prabodha |
| **Student Number** | [INSERT_YOUR_STUDENT_ID] |
| **Slack Handle** | [INSERT_YOUR_SLACK_HANDLE] |
| **GCP Project ID** | `visun-gcp-lab` |
| **Submission Type** | Alternative Option (Capstone Project) |

---

## 📖 Project Description

This repository is the **core infrastructure platform** of the Capstone microservices ecosystem. It is structured as a **super-repository** containing three independent Git submodules that together form the backbone of the distributed system: centralized configuration, service discovery, and API routing.

The platform is deployed on **Google Cloud Platform (GCP)** using **Compute Engine Managed Instance Groups (MIGs)** for horizontally scalable, self-healing infrastructure. Each service is process-managed using **PM2**, and all external traffic is routed through an **External Regional Application Load Balancer**, ensuring high availability and intelligent traffic distribution across the platform's instances.

### 🧩 Included Submodules

| # | Submodule | Port | Responsibility |
|---|---|---|---|
| 1️⃣ | `config-server` | `9000` | Fetches centralized `.yaml` configuration files from the [Capstone Project Configurations](#) GitHub repository and serves them to all client microservices at runtime. |
| 2️⃣ | `service-registry` | `9001` | Netflix Eureka Server — enables dynamic service discovery, health monitoring, and de-registration of microservice instances. |
| 3️⃣ | `api-gateway` | `7000` | Spring Cloud Gateway — single entry point for all client requests. Handles CORS policy enforcement, caps file uploads at **20MB**, and performs dynamic, load-balanced routing via `lb://` using Spring Cloud LoadBalancer. |

---

## 🏛️ High-Level Architecture

```
                                   ┌─────────────────────────────┐
                                   │   External Regional          │
                                   │   Application Load Balancer  │
                                   └───────────────┬──────────────┘
                                                    │
                                                    ▼
                                   ┌─────────────────────────────┐
                                   │   api-gateway  (Port 7000)   │
                                   │   • CORS Policy               │
                                   │   • 20MB Upload Limit         │
                                   │   • lb:// Routing              │
                                   └───────────────┬──────────────┘
                                                    │
                        ┌───────────────────────────┼───────────────────────────┐
                        ▼                            ▼                           ▼
           ┌────────────────────────┐   ┌────────────────────────┐   ┌────────────────────────┐
           │  service-registry       │   │  config-server          │   │  Downstream Business    │
           │  (Eureka - Port 9001)   │◄──┤  (Port 9000)            │   │  Microservices          │
           │  Service Discovery      │   │  Centralized Config     │   │  (see Backend Services) │
           └────────────────────────┘   └────────────────────────┘   └────────────────────────┘
                                                    │
                                                    ▼
                                   ┌─────────────────────────────┐
                                   │  Capstone Project             │
                                   │  Configurations (GitHub)      │
                                   └─────────────────────────────┘
```

---

## 📁 Repository Structure

```
backend-microservices-platform/
├── config-server/          # Git Submodule — Port 9000
├── service-registry/       # Git Submodule — Port 9001
├── api-gateway/             # Git Submodule — Port 7000
├── .gitmodules              # Submodule mapping definitions
└── README.md
```

---

## 🛠️ Technology Stack

| Category | Technology |
|---|---|
| **Language** | Java 17 |
| **Framework** | Spring Boot 3.3.2 |
| **Microservices Framework** | Spring Cloud 2023.0.3 |
| **Service Discovery** | Netflix Eureka |
| **API Gateway** | Spring Cloud Gateway |
| **Load Balancing (Client-Side)** | Spring Cloud LoadBalancer |
| **Build Tool** | Maven |
| **Process Manager** | PM2 |
| **Cloud Provider** | Google Cloud Platform (GCP) |
| **Compute** | Compute Engine — Managed Instance Groups (MIGs) |
| **Networking** | External Regional Application Load Balancer |
| **Version Control** | Git (Submodule-based Super-Repo) |

---

## 🚀 Local Setup / Getting Started

### ✅ Prerequisites

- Java 17 (JDK)
- Maven 3.9+
- Git
- Node.js & npm (for PM2, optional for local runs)

### 1️⃣ Clone the Super-Repository with Submodules

```bash
git clone --recurse-submodules https://github.com/<your-username>/backend-microservices-platform.git
cd backend-microservices-platform
```

> If you already cloned without submodules, initialize them manually:
> ```bash
> git submodule update --init --recursive
> ```

### 2️⃣ Build Each Submodule

```bash
cd config-server && mvn clean install && cd ..
cd service-registry && mvn clean install && cd ..
cd api-gateway && mvn clean install && cd ..
```

### 3️⃣ Run Services Locally (in order)

> ⚠️ **Startup order matters** — `config-server` and `service-registry` must be up before `api-gateway`.

```bash
# Terminal 1 — Config Server (Port 9000)
cd config-server
mvn spring-boot:run

# Terminal 2 — Service Registry / Eureka (Port 9001)
cd service-registry
mvn spring-boot:run

# Terminal 3 — API Gateway (Port 7000)
cd api-gateway
mvn spring-boot:run
```

### 4️⃣ Verify

| Service | URL |
|---|---|
| Config Server | `http://localhost:9000/actuator/health` |
| Eureka Dashboard | `http://localhost:9001` |
| API Gateway | `http://localhost:7000/actuator/health` |

### ☁️ Production Deployment (GCP)

Services are deployed on **Compute Engine MIGs** and managed by **PM2** for process resilience (auto-restart on crash, log management). Traffic reaches the `api-gateway` via a GCP **External Regional Application Load Balancer**, which distributes incoming requests across all healthy MIG instances.

```bash
# Example PM2 startup on a GCE instance
pm2 start "java -jar api-gateway.jar" --name api-gateway
pm2 save
```

---

## 📄 License

This project was developed as part of the **Enterprise Cloud Architecture** university module (Capstone Project — Alternative Option).
