module.exports = {
    apps: [
        {
            name: "student-service",
            script: "java.exe",
            args: ["-jar", "student-service/target/Student-Service-1.0.0.jar"],
            log_file: "./student-service/logs/student-service.log",
            instances: 2,
            exec_mode: "fork"
        },
        {
            name: "program-service",
            script: "java.exe",
            args: ["-jar", "program-service/target/Program-Service-1.0.0.jar"],
            log_file: "./program-service/logs/program-service.log",
            instances: 2,
            exec_mode: "fork"
        },
        {
            name: "enrollment-service",
            script: "java.exe",
            args: ["-jar", "enrollment-service/target/Enrollment-Service-1.0.0.jar"],
            log_file: "./enrollment-service/logs/enrollment-service.log",
            instances: 2,
            exec_mode: "fork"
        }
    ]
};