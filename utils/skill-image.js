import angular from '../app/assets/svg/skills/angular.svg';
import aws from '../app/assets/svg/skills/aws.svg';
import bootstrap from '../app/assets/svg/skills/bootstrap.svg';
import css from '../app/assets/svg/skills/css.svg';
import docker from '../app/assets/svg/skills/docker.svg';
import figma from '../app/assets/svg/skills/figma.svg';
import gcp from '../app/assets/svg/skills/gcp.svg';
import git from '../app/assets/svg/skills/git.svg';
import graphql from '../app/assets/svg/skills/graphql.svg';
import html from '../app/assets/svg/skills/html.svg';
import java from '../app/assets/svg/skills/java.svg';
import javascript from '../app/assets/svg/skills/javascript.svg';
import materialui from '../app/assets/svg/skills/materialui.svg';
import mongoDB from '../app/assets/svg/skills/mongoDB.svg';
import mysql from '../app/assets/svg/skills/mysql.svg';
import nextJS from '../app/assets/svg/skills/nextJS.svg';
import nodejs from '../app/assets/svg/skills/nodejs.svg';
import postgresql from '../app/assets/svg/skills/postgresql.svg';
import prisma from '../app/assets/svg/skills/prisma.svg';
import python from '../app/assets/svg/skills/python.svg';
import react from '../app/assets/svg/skills/react.svg';
import redux from '../app/assets/svg/skills/redux.svg';
import tailwind from '../app/assets/svg/skills/tailwind.svg';
import tensorflow from '../app/assets/svg/skills/tensorflow.svg';
import typescript from '../app/assets/svg/skills/typescript.svg';
import vitejs from '../app/assets/svg/skills/vitejs.svg';

export const skillsImage = (skill) => {
  const skillID = skill.toLowerCase();
  switch (skillID) {
    case 'gcp':
      return gcp;
    case 'html':
      return html;
    case 'docker':
      return docker;
    case 'css':
      return css;
    case 'angular':
      return angular;
    case 'javascript':
      return javascript;
    case 'next js':
      return nextJS;
    case 'react':
      return react;
    case 'typescript':
      return typescript;
    case 'bootstrap':
      return bootstrap;
    case 'mongodb':
      return mongoDB;
    case 'mysql':
      return mysql;
    case 'postgresql':
      return postgresql;
    case 'tailwind':
      return tailwind;
    case 'vitejs':
      return vitejs;
    case 'java':
      return java;
    case 'prisma':
      return prisma;
    case 'python':
      return python;
    case 'aws':
      return aws;
    case 'git':
      return git;
    case 'graphql':
      return graphql;
    case 'materialui':
      return materialui;
    case 'tensorflow':
      return tensorflow;
    case 'figma':
      return figma;
    case 'node js':
      return nodejs;
    case 'redux':
      return redux;
    default:
      break;
  }
}
