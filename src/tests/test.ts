import { expect } from 'chai';
import { parseEnvVariables, EnvVarsTemplate } from '..';


describe('Testing parseEnvVariables()', () => {
    process.env.NET_TIMEOUT = '5000';
    process.env.LOG_TYPE = 'tiny';
    process.env.ENABLE_LOGGING = 'true';
    process.env.ADAPTER_CONFIG = '{"url":"https://www.example.com","basePath":"/api/v1"}';

    it('checking a basic set of env variables against template for expected types', () => {
      const myEnvVariables: EnvVarsTemplate = {
        NET_TIMEOUT: 'number',
        LOG_TYPE: 'string',
        ENABLE_LOGGING: 'boolean',
        ADAPTER_CONFIG: 'json',
      };  
  
      const parsedEnvVariables = parseEnvVariables(myEnvVariables);
      expect(parsedEnvVariables.NET_TIMEOUT).to.be.an('number').to.eql(5000);
      expect(parsedEnvVariables.LOG_TYPE).to.be.an('string').to.eql('tiny');
      expect(parsedEnvVariables.ENABLE_LOGGING).to.be.an('boolean').to.eql(true);
      expect(parsedEnvVariables.ADAPTER_CONFIG).to.be.an("object").to.have.property("url").to.equal("https://www.example.com");
    });

    it('checking a set of env variables that do not match template types', () => {
      const myEnvVariables: EnvVarsTemplate = {
        NET_TIMEOUT: 'string',
        LOG_TYPE: 'number',
        ENABLE_LOGGING: 'number',
        ADAPTER_CONFIG: 'number',
      };  
  
      const parsedEnvVariables = parseEnvVariables(myEnvVariables);
      expect(parsedEnvVariables.NET_TIMEOUT).to.be.an('string').to.eql('5000');
      expect(parsedEnvVariables.LOG_TYPE).to.be.an('string').to.eql('tiny');
      expect(parsedEnvVariables.ENABLE_LOGGING).to.be.an('string').to.eql('true');
      expect(parsedEnvVariables.ADAPTER_CONFIG).to.be.an("string").to.eql('{"url":"https://www.example.com","basePath":"/api/v1"}');
    });
    
    it('uses a template with all json types', () => {
      const myEnvVariables: EnvVarsTemplate = {
        NET_TIMEOUT: 'json',
        LOG_TYPE: 'json',
        ENABLE_LOGGING: 'json',
        ADAPTER_CONFIG: 'json',
      };  
      const parsedEnvVariables = parseEnvVariables(myEnvVariables);
      expect(parsedEnvVariables.NET_TIMEOUT).to.be.an('number').to.eql(5000);
      expect(parsedEnvVariables.LOG_TYPE).to.be.an('string').to.eql('tiny');
      expect(parsedEnvVariables.ENABLE_LOGGING).to.be.an('boolean').to.eql(true);
      expect(parsedEnvVariables.ADAPTER_CONFIG).to.be.an("object").to.have.property("url").to.equal("https://www.example.com");
    });

    it('checking empty env variables against a template', () => {
      const myEnvVariables: EnvVarsTemplate = {
        NET_TIMEOUT: 'number',
        LOG_TYPE: 'string',
        ENABLE_LOGGING: 'boolean',
        ADAPTER_CONFIG: 'json',
      };  
  
      delete process.env.NET_TIMEOUT;
      delete process.env.LOG_TYPE;
      delete process.env.ENABLE_LOGGING;
      delete process.env.ADAPTER_CONFIG;
      const parsedEnvVariables = parseEnvVariables(myEnvVariables);
      expect(parsedEnvVariables.NET_TIMEOUT).to.be.undefined;
      expect(parsedEnvVariables.LOG_TYPE).to.be.undefined;
      expect(parsedEnvVariables.ENABLE_LOGGING).to.be.undefined;
      expect(parsedEnvVariables.ADAPTER_CONFIG).to.be.undefined;
    });
});