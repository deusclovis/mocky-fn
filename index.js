'use strict';

// insert custom modules here
const AWS = require("aws-sdk");
const config = require('./config');
// const database = require('./database');
const response = require('./response');
const model = require('./model');
const iplocation = require('iplocation');

// insert node modules here
const request = require('request');
const _ = require('lodash');
const Joi = require('joi');
const CryptoJS = require('crypto-js');
const zlib = require('zlib');
const elasticsearch = require("elasticsearch");
const httpawses = require("http-aws-es");

const testEndpoint = '';
// const elasticSearchHost = 'https://search-autocompletedata-gj7sxmdc3orsrbvsadr64wri2m.ap-southeast-1.es.amazonaws.com';
const esPropertiesIndex = "properties";

exports.handler = async (event, context, callback) => {
	try {
		// get query object
		let query = event.query;

		if (!query) {
			query = {};
		}

		const result = Joi.validate(query, Joi.object().keys(model.searchQuerySchema), { stripUnknown: true });

		if (result.error !== null) {
			response.error(callback, response.status.BAD_REQUEST, result.error.details[0].message.replace(/['"]+/g, ''));
		} else {
			
			const responseFromCall = await testCall();
			console.log('response: ' + printJSON(responseFromCall));


			const toReturn = {
				data: responseFromCall
			}
			response.success(callback, response.status.SUCCESS, toReturn);
		}
	} catch (e) {
		console.log(e);
		response.error(callback, response.status.INTERNAL_SERVER_ERROR, e.message);
	}
}

const testCall = () => {
    return new Promise((resolve, reject) => {
        request({
            url: 'http://www.mocky.io/v2/5be1a4793000005300d9aafc',
            method: 'GET',
            gzip: true
        }, (err, response, body) => {
            if (err) {
                reject(err);
            }
            if (response.statusCode === 200) {
                resolve(JSON.parse(body), response.statusCode);
            } else {
                resolve([]);
            }
        });
    });
}

const wordify = (str) => {
	return _.map(str.replace(/[_]/g, ' ').split(' '), i => {
		if ( i != 'of') {
			return _.startCase(i);
		} else {
			return i;
		}
	}).join(' ');
}

const truncateString = (str, maxLength) => {
	return str.substring(0, maxLength);
}

const printJSON = (obj) => {
	console.log(JSON.stringify(obj, null, 2));
}

const returnValues = (obj) => {
	return _.values(obj);
}