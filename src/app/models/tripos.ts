export interface AuthorizationPOST {
  action: string;
  laneID: string;
  transactionAmount: string;
  tipAmount: string;
  referenceNumber: string;
  invokeManualEntry : boolean // = False
  getToken: string;
  //The card logo. Possible values are: Visa, Mastercard, Discover, Amex, Diners Club, JCB, Carte Blanche, Other.'
  cardLogo: string;
  clerkNumber: string;
  tokenId: string;
  tokenProvider: string;
  vaultId: string;
  transactionID: string;
  paymentType: string;
  description: string;
  terminalId: string;
  activationCode: string;
  marketCode: string;
  errorMessage: string

}


export interface AuthorizationResponse {

  _hasErrors : boolean;
  _errors : string[];
  _links  : string[];

  accountNumber : string;
  accountType : string;
  approvalNumber : string;
  balanceAmount : string;
  binValue : string;
  cardHolderName : string;


  //The card logo. Possible values are: Visa, Mastercard, Discover, Amex, Diners Club, JCB, Carte Blanche, Other.//
  cardLogo : string;
  balanceCurrencyCode : string;

  convenienceFeeAmount : string;
  ebtType : string;
  //The type Of the EBT card

  countryCode : string;

  //emv
  emv : any;
  //Object(Emv)

  //entryMode
  entryMode : string;
  //Description of how card was entered.

  //expirationMonth
  expirationMonth : string;
  //String
  //The card //s expiration month

  //expirationYear
  expirationYear : string;
  //The card //s expiration year

  //fsaCard
  fsaCard : string;        //String
  //Indicates whether the card used was a FSA card.
  //Note: Maybe = No BIN entry to determine if FSA.

  //isApproved
  isApproved : boolean;
  //Set To True If the host approved the transaction.

  //isCardInserted
  isCardInserted : boolean;
  //Indicates whether the EMV card was still inserted into the payment device When the transaction completed.

  //isOffline
  isOffline : boolean;
  //A boolean value indicating whether triPOS Is disconnected from the host.

  //language
  language : string;
  //The language used In the transaction.

  //merchantId
  merchantId : string;
  //The Merchant used To process the transaction.

  //networkLabel
  networkLabel : string;
  //Label that shows the network where the transaction was routed For authorization

  //nonFinancialData
  nonFinancialData : any;
  //Object(NonFinancialCard)
  //NonFinancialCard

  //paymentType
  paymentType : string;
  //Description of payment type utilized.

  //pinVerified
  pinVerified : boolean;
  //True if the PIN was verified, false if Not verified Or undetermined.

  //quickChipMessage
  quickChipMessage : string;
  //The message unique To QuickChip pre-read functionality only.

  //signature
  signature : any;
  //Object(Signature)
  //Signature

  //statusCode
  statusCode : string;
  //The status code For the transaction.

  //subTotalAmount
  subTotalAmount : number;
  //The original amount sent For the transaction.

  //terminalId
  terminalId : string;
  //The ID Of the terminal used during the transaction

  //tipAmount
  tipAmount : number;
  //The tip amount added To the transaction.

  //tokenId
  tokenId : string;
  //The Token ID.

  //tokenProvider
  tokenProvider : string;
  //The Token Provider.

  //totalAmount
  expitotalAmountrationYear : number;
  //The total amount Of the transaction.

  //transactionDateTime
  transactionDateTime : string;
  //Transaction date/time in ISO8601 format

  transactionId : string;
  //String

  errorMessage : string;


}
