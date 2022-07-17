
export interface ISite {

    id:      number;
    name:    string;
    url:     string;
    imgName: string;
    address: string;
    city:    string;
    state:   string;
    zip:     string;
    phone:   string;
    metrcURL: string;
    metrcLicenseNumber: string;
    metrcKey: string;
    metrcUser: string;

    salesData?: any[] //| MatTableDataSource<ISalesPayments>;
    salesOrderSummary?: any[] //| MatTableDataSource<ISalesReportingOrdersSummary>;
    status: string;

    userLoyaltyPoints: number;
    userTotalPurchases: number;
}
