// const winston = require('winston');
// const winstonDaily = require('winston-daily-rotate-file');
// const process = require('process');
import winston from "winston";
import winstonDaily from "winston-daily-rotate-file";

const { combine, timestamp, label, printf } = winston.format;

//* 로그 파일 저장 경로 → 루트 경로/logs 폴더
// const logDir = `${process.cwd()}/logs`;

//* log 출력 포맷 정의 함수
const logFormat = printf(({ level, message, label, timestamp }) => {
   return `${timestamp} [${label}] ${level}: ${message}`; // 날짜 [시스템이름] 로그레벨 메세지
});