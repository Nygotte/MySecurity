//Modules imports
const {
    MessageType,
    WAMessage,
    ReconnectMode,
    WAProto,
    useSingleFileAuthState,
    MediaType,
    MessageOptions,
    Mimetype,
    DisconnectReason,
    downloadContentFromMessage
} = require('@adiwajshing/baileys')
var makeWASocket = require("@adiwajshing/baileys");
var pino = require("pino");
const fs = require('fs')
const moment = require('moment-timezone')
const CFonts = require('cfonts')
const express = require('express');

const app = express();
const time = moment.tz('America/Sao_Paulo').format('HH:mm:ss')
const date = moment.tz('America/Sao_Paulo').format('DD/MM/YYYY') 

const {
	saveState,
	state
} = useSingleFileAuthState('./database/auth.json');

function number_validation(phone_number) {
	
    phone_number = phone_number.replace(/\D/g, '');

    if (!(phone_number.length >= 10 && phone_number.length <= 11)) return false;

    if (phone_number.length == 11 && parseInt(phone_number.substring(2, 3)) != 9) return false;

    for (var n = 0; n < 10; n++) {
        if (phone_number == new Array(11).join(n) || phone_number == new Array(12).join(n)) return false;
    }
    var codigosDDD = [11, 12, 13, 14, 15, 16, 17, 18, 19,
        21, 22, 24, 27, 28, 31, 32, 33, 34,
        35, 37, 38, 41, 42, 43, 44, 45, 46,
        47, 48, 49, 51, 53, 54, 55, 61, 62,
        64, 63, 65, 66, 67, 68, 69, 71, 73,
        74, 75, 77, 79, 81, 82, 83, 84, 85,
        86, 87, 88, 89, 91, 92, 93, 94, 95,
        96, 97, 98, 99];
    if (codigosDDD.indexOf(parseInt(phone_number.substring(0, 2))) == -1) return false;

    if (phone_number.length == 10 && [2, 3, 4, 5, 7].indexOf(parseInt(phone_number.substring(2, 3))) == -1) return true;

    return true;
}

(async () => {
	CFonts.say('    Nyx', {
		font: 'tiny',
		align: 'left',
		colors: ['green']
	})
	CFonts.say('Security', {
		font: 'tiny',
		align: 'left',
		colors: ['green']
	})

	var nyx = undefined;

	var startSock = () => {
		const nyx = makeWASocket["default"]({
			printQRInTerminal: true,
			defaultQueryTimeoutMs: undefined,
			browser: ['NyxSecurity', "Chrome", "3.0"],
			logger: pino({
				level: 'warn'
			}),
			auth: state
		})
		// verificar se o numero existe no wpp e retona o numero no fortato do wpp
		async function convertNumber(number) {
    
			if (number.startsWith(55)) {
				number = number.substring("2")
			}
		
			if (number_validation(number) == true) {
		
				number = number.replace(number, `55${number}`)
		
				const [result] = await nyx.onWhatsApp(number)
					
				if (result.exists) {
						
					return result.jid;
						
				} 
				
			}
			
		}

		// /Id da menssagem/Numedo do requisitor/Numero de emergencia
		app.get("/:msgId/:number/:emergency", (req, res) => {

			async function menssage() {

				const from = await convertNumber(req.params.number)

				if (req.params.msgId == 00) {

					if (req.params.emergency == 190) {

						const alertWarningButtons = [
							
    					{index: 1, callButton: {displayText: 'Numero de emergência!', phoneNumber: '190'}},

						]
						const alertWarning = {
    						text: `🚨 *ALERTA* 🚨\n\n*Sua porta foi aberta!*\n\nHora: ${time}\nData: ${date}`,
    						footer: 'MySecurity',
    						templateButtons: alertWarningButtons
						}
						nyx.sendMessage(from, alertWarning)
						res.send(req.params.msgId)
						
					} else {

						var emergency = await convertNumber(req.params.emergency)
						emergency = emergency.substring(2)
						emergency = emergency.substring(0,2) + "9" + emergency.substring(2).split('@')[0];

						const alertWarningButtons = [
							
    					{index: 1, callButton: {displayText: 'Numero de emergência!', phoneNumber: emergency}},

						]
						const alertWarning = {
    						text: `🚨 *ALERTA* 🚨\n\n*Sua porta foi aberta!*\n\nHora: ${time}\nData: ${date}`,
    						footer: 'MySecurity',
    						templateButtons: alertWarningButtons
						}
						nyx.sendMessage(from, alertWarning)
						res.send(req.params.msgId)
						
					}

						
				}else if (req.params.msgId == 01) {

					if (req.params.emergency == 190) {

						const alertWarningButtons = [
							
    					{index: 1, callButton: {displayText: 'Numero de emergência!', phoneNumber: '190'}},

						]
						const alertWarning = {
    						text: `🚨 *ALERTA* 🚨\n\n*Sua porta foi fechada!*\n\nHora: ${time}\nData: ${date}`,
    						footer: 'MySecurity',
    						templateButtons: alertWarningButtons
						}
						nyx.sendMessage(from, alertWarning)
						res.send(req.params.msgId)
						
					} else {

						var emergency = await convertNumber(req.params.emergency)
						emergency = emergency.substring(2)
						emergency = emergency.substring(0,2) + "9" + emergency.substring(2).split('@')[0];

						const alertWarningButtons = [
							
    					{index: 1, callButton: {displayText: 'Numero de emergência!', phoneNumber: emergency}},

						]
						const alertWarning = {
    						text: `🚨 *ALERTA* 🚨\n\n*Sua porta foi fechada!*\n\nHora: ${time}\nData: ${date}`,
    						footer: 'MySecurity',
    						templateButtons: alertWarningButtons
						}
						nyx.sendMessage(from, alertWarning)
						res.send(req.params.msgId)
						
					}
				}else if (req.params.msgId == 02) {

					if (req.params.emergency == 190) {

						const alertWarningButtons = [
							
    					{index: 1, callButton: {displayText: 'Numero de emergência!', phoneNumber: '190'}},

						]
						const alertWarning = {
    						text: `🚨 *ALERTA* 🚨\n\n*Sua porta foi fechada!*\n\nHora: ${time}\nData: ${date}`,
    						footer: 'MySecurity',
    						templateButtons: alertWarningButtons
						}
						nyx.sendMessage(from, alertWarning)
						res.send(req.params.msgId)
						
					} else {

						var emergency = await convertNumber(req.params.emergency)
						emergency = emergency.substring(2)
						emergency = emergency.substring(0,2) + "9" + emergency.substring(2).split('@')[0];

						const alertWarningButtons = [
							
    					{index: 1, callButton: {displayText: 'Numero de emergência!', phoneNumber: emergency}},

						]
						const alertWarning = {
    						text: `🚨 *ALERTA* 🚨\n\n*Sua porta foi fechada!*\n\nHora: ${time}\nData: ${date}`,
    						footer: 'MySecurity',
    						templateButtons: alertWarningButtons
						}
						nyx.sendMessage(from, alertWarning)
						res.send(req.params.msgId)
						
					}
				}	
			}
			menssage()
			
		}).listen(8080, '127.0.0.1');

		//app.listen(process.env.PORT);
		return nyx
	}

	nyx = startSock()
	nyx.ev.on('connection.update',
		async (update) =>
		{
			const {
				connection,
				lastDisconnect
			} = update

			if (connection === 'close') {

				const shouldReconnect = (lastDisconnect.error)?.output?.statusCode !== DisconnectReason.loggedOut
				lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut ? startSock(): console.log('connection closed due to ', lastDisconnect.error, ', reconnecting ', shouldReconnect)
			}

			console.log('Update', update)

		})

	// Esculta e atualizar as credências no arquivo auth.json
	nyx.ev.on('creds.update',
		saveState);

	return nyx;

})()
