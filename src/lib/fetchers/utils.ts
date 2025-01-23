export const loginEnvelop = `
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" 
xmlns:tem="http://tempuri.org/">
   <soapenv:Header>
      <tem:ROClientIDHeader>
         <!--Optional:-->
         <tem:ID></tem:ID>
      </tem:ROClientIDHeader>
   </soapenv:Header>
   <soapenv:Body>
      <tem:LoginWSService___LoginCli>
         <tem:strCodAge>${process.env.TIPSA_AGENCY}</tem:strCodAge>
         <tem:strCod>${process.env.TIPSA_USER}</tem:strCod>
         <tem:strPass>${process.env.TIPSA_PASSWORD}</tem:strPass>
      </tem:LoginWSService___LoginCli>
   </soapenv:Body>
</soapenv:Envelope>`

export const grabaEnvio24 = (
  dtFecha: string,
  strCodTipoServ: string,
  strNomDes: string,
  strDirDes: string,
  strPobDes: string,
  strCPDes: string,
  strTlfDes: string,
  intPaq: number,
  strContenido: string,
  id: string
) => {
  return `<?xml version="1.0" encoding="UTF-8"?>
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
   <soapenv:Header>
      <tem:ROClientIDHeader>
         <tem:ID>${id}</tem:ID>
      </tem:ROClientIDHeader>
   </soapenv:Header>
   <soapenv:Body>
      <tem:GrabaEnvio24>
         <tem:strCodAgeCargo>000000</tem:strCodAgeCargo>
         <tem:strCodAgeOri>${process.env.TIPSA_AGENCY}</tem:strCodAgeOri>
         <tem:dtFecha>${dtFecha}</tem:dtFecha>
         <tem:strCodTipoServ>${strCodTipoServ}</tem:strCodTipoServ>
         <tem:strCodCli>${process.env.TIPSA_USER}</tem:strCodCli>
         <tem:strNomOri>Termogar.es</tem:strNomOri>
         <tem:strDirOri>Pruebas Informatica</tem:strDirOri>
         <tem:strPobOri>${strPobDes}</tem:strPobOri>
         <tem:strCPOri>${strCPDes}</tem:strCPOri>
         <tem:strTlfOri>666555444</tem:strTlfOri>
         <tem:strNomDes>${strNomDes}</tem:strNomDes>
         <tem:strDirDes>${strDirDes}</tem:strDirDes>
         <tem:strPobDes>${strPobDes}</tem:strPobDes>
         <tem:strCPDes>${strCPDes}</tem:strCPDes>
         <tem:strCodPais>ES</tem:strCodPais>
         <tem:strTlfDes>${strTlfDes}</tem:strTlfDes>
         <tem:intPaq>${intPaq}</tem:intPaq>
         <tem:strContenido>${strContenido}</tem:strContenido>
         <tem:boInsert>true</tem:boInsert>
         <tem:strAlbaran></tem:strAlbaran>
      </tem:GrabaEnvio24>
   </soapenv:Body>
</soapenv:Envelope>`
}
