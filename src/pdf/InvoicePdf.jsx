import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

const NAVY = "#1A2F5C";

const styles = StyleSheet.create({
  page: {
    padding: 24,
    fontSize: 9,
    color: NAVY,
    fontFamily: "Helvetica",
  },
  border: {
    border: `2pt solid ${NAVY}`,
  },
  headerBlock: {
    borderBottom: `2pt solid ${NAVY}`,
    paddingBottom: 6,
  },
  headerTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 8,
    fontWeight: "bold",
  },
  logoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  logo: { width: 55, height: 55, marginRight: 10 },
  titleWrap: { flex: 1, textAlign: "center" },
  taxInvoice: {
    fontSize: 9,
    letterSpacing: 2,
    textDecoration: "underline",
    fontWeight: "bold",
  },
  companyName: {
    fontSize: 22,
    fontWeight: "bold",
    letterSpacing: 1,
    marginTop: 2,
  },
  mfgLine: {
    fontSize: 8,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 4,
    lineHeight: 1.3,
  },
  addrLine: {
    fontSize: 7.5,
    textAlign: "center",
    marginTop: 3,
    lineHeight: 1.3,
  },
  clientMetaRow: {
    flexDirection: "row",
    borderLeft: `2pt solid ${NAVY}`,
    borderRight: `2pt solid ${NAVY}`,
  },
  clientBox: {
    width: "50%",
    padding: 6,
    borderRight: `2pt solid ${NAVY}`,
  },
  clientLine: { marginBottom: 6, fontSize: 9 },
  metaBox: { width: "50%" },
  metaRow: {
    flexDirection: "row",
    borderBottom: `0.5pt solid ${NAVY}`,
  },
  metaCell: {
    flex: 1,
    padding: 5,
    flexDirection: "row",
    fontSize: 8.5,
  },
  metaCellBordered: { borderRight: `0.5pt solid ${NAVY}` },
  metaLabel: { fontWeight: "bold", marginRight: 4 },
  table: {
    borderTop: `2pt solid ${NAVY}`,
    borderLeft: `2pt solid ${NAVY}`,
    borderRight: `2pt solid ${NAVY}`,
  },
  tHeadRow: {
    flexDirection: "row",
    borderBottom: `2pt solid ${NAVY}`,
    fontWeight: "bold",
    fontSize: 8,
    textAlign: "center",
  },
  tRow: {
    flexDirection: "row",
    borderBottom: `0.5pt solid ${NAVY}`,
    minHeight: 20,
  },
  cSl: {
    width: "6%",
    borderRight: `0.5pt solid ${NAVY}`,
    padding: 4,
    textAlign: "center",
  },
  cPart: { width: "46%", borderRight: `0.5pt solid ${NAVY}`, padding: 4 },
  cHsn: {
    width: "12%",
    borderRight: `0.5pt solid ${NAVY}`,
    padding: 4,
    textAlign: "center",
  },
  cQty: {
    width: "9%",
    borderRight: `0.5pt solid ${NAVY}`,
    padding: 4,
    textAlign: "center",
  },
  cRate: {
    width: "11%",
    borderRight: `0.5pt solid ${NAVY}`,
    padding: 4,
    textAlign: "right",
  },
  cRs: {
    width: "11%",
    borderRight: `0.5pt solid ${NAVY}`,
    padding: 4,
    textAlign: "right",
  },
  cPs: { width: "5%", padding: 4, textAlign: "center" },
  totalsWrap: {
    flexDirection: "row",
    border: `2pt solid ${NAVY}`,
    borderTop: 0,
  },
  wordsBox: {
    width: "50%",
    padding: 6,
    borderRight: `2pt solid ${NAVY}`,
    justifyContent: "space-between",
  },
  wordsLabel: { fontWeight: "bold", fontSize: 9, marginBottom: 3 },
  wordsText: {
    fontSize: 8.5,
    fontStyle: "italic",
    borderBottom: `0.5pt solid ${NAVY}`,
    paddingBottom: 4,
  },
  totalsBox: { width: "50%" },
  tRowLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
    borderBottom: `0.5pt solid ${NAVY}`,
    fontSize: 8.5,
  },
  grandRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 6,
    backgroundColor: "#E8ECF3",
    fontWeight: "bold",
    fontSize: 9,
  },
  footerWrap: {
    flexDirection: "row",
    border: `2pt solid ${NAVY}`,
    borderTop: 0,
  },
  termsBox: {
    width: "50%",
    padding: 6,
    borderRight: `2pt solid ${NAVY}`,
    justifyContent: "space-between",
  },
  termsTitle: { fontWeight: "bold", fontSize: 9, marginBottom: 3 },
  termsItem: { fontSize: 7, marginBottom: 2 },
  sigBox: {
    width: "50%",
    padding: 6,
    alignItems: "center",
    justifyContent: "space-between",
  },
  sigForLine: { fontSize: 9, marginBottom: 4 },
  sigPad: {
    width: "100%",
    height: 55,
    border: `0.5pt solid ${NAVY}`,
    marginTop: "auto",
    alignItems: "center",
    justifyContent: "center",
  },
  sigImg: { width: "90%", height: 45, objectFit: "contain" },
  sigCaption: {
    textAlign: "center",
    fontSize: 7.5,
    fontWeight: "bold",
    marginTop: 3,
  },
});

const money = (n) =>
  (n || 0).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

function SignatureBlock({ label, value }) {
  return (
    <View style={styles.sigBox}>
      {label === "Authorised Signatory" && (
        <Text style={styles.sigForLine}>For TS FABRICATION</Text>
      )}
      <View style={styles.sigPad}>
        {value ? <Image src={value} style={styles.sigImg} /> : null}
      </View>
      <Text style={styles.sigCaption}>{label}</Text>
    </View>
  );
}

export default function InvoicePdf({
  client,
  meta,
  items,
  gst,
  totalValue,
  sgstAmt,
  cgstAmt,
  igstAmt,
  grandTotal,
  words,
  customerSig,
  authSig,
  logoUrl,
}) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* HEADER */}
        <View style={styles.headerBlock}>
          <View style={styles.headerTopRow}>
            <Text>GST : GST 29AGMPT0667J1ZO</Text>
            <Text>Cell : 99027 40570 / 86603 32757</Text>
          </View>
          <View style={styles.logoRow}>
            {logoUrl ? (
              <Image src={logoUrl} style={styles.logo} />
            ) : (
              <View style={styles.logo} />
            )}
            <View style={styles.titleWrap}>
              <Text style={styles.taxInvoice}>TAX INVOICE</Text>
              <Text style={styles.companyName}>TS FABRICATION</Text>
            </View>
            <View style={{ width: 55 }} />
          </View>
          <Text style={styles.mfgLine}>
            Mfg. of : All kinds of Brass Railings, Antique Brass Railings and
            Stainless Steel Railings, Power Coatings Railings, Fabrication with
            304 & 316 Grade
          </Text>
          <Text style={styles.addrLine}>
            # 26, Nandini Layout, Outer Ring Road, Kanteerava Studio Circle,
            Sonal Garments Road, Near Saneshwara Temple, Bangalore - 560 096.
            E-mail : tsfabrication@gmail.com
          </Text>
        </View>

        {/* CLIENT + META */}
        <View style={styles.clientMetaRow}>
          <View style={styles.clientBox}>
            <Text style={styles.clientLine}>M/s. {client.name}</Text>
            <Text style={styles.clientLine}>{client.addr1}</Text>
            <Text style={styles.clientLine}>{client.addr2}</Text>
          </View>
          <View style={styles.metaBox}>
            <View style={styles.metaRow}>
              <View style={[styles.metaCell, styles.metaCellBordered]}>
                <Text style={styles.metaLabel}>Invoice No.</Text>
                <Text>{meta.invoiceNo}</Text>
              </View>
              <View style={styles.metaCell}>
                <Text style={styles.metaLabel}>Date :</Text>
                <Text>{meta.date}</Text>
              </View>
            </View>
            <View style={styles.metaRow}>
              <View style={[styles.metaCell, styles.metaCellBordered]}>
                <Text style={styles.metaLabel}>D.C. No.</Text>
                <Text>{meta.dcNo}</Text>
              </View>
              <View style={styles.metaCell}>
                <Text style={styles.metaLabel}>Date :</Text>
                <Text>{meta.dcDate}</Text>
              </View>
            </View>
            <View style={styles.metaRow}>
              <View style={styles.metaCell}>
                <Text style={styles.metaLabel}>Customer GST :</Text>
                <Text>{meta.customerGst}</Text>
              </View>
            </View>
            <View style={[styles.metaRow, { borderBottom: 0 }]}>
              <View style={styles.metaCell}>
                <Text style={styles.metaLabel}>E Way Bill No. :</Text>
                <Text>{meta.ewayBill}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* RED LINE */}
        <View
          style={{
            borderTop: "1pt solid black",
            marginTop: -1,
          }}
        />

        {/* ITEMS TABLE */}
        <View style={styles.table}>
          <View style={styles.tHeadRow}>
            <Text style={styles.cSl}>Sl. No.</Text>
            <Text style={styles.cPart}>PARTICULARS</Text>
            <Text style={styles.cHsn}>HSN Code</Text>
            <Text style={styles.cQty}>Qty.</Text>
            <Text style={styles.cRate}>Rate</Text>
            <Text style={styles.cRs}>Rs.</Text>
            <Text style={styles.cPs}>Ps.</Text>
          </View>
          {items.map((item, idx) => (
            <View style={styles.tRow} key={item.id}>
              <Text style={styles.cSl}>{idx + 1}</Text>
              <Text style={styles.cPart}>{item.particulars}</Text>
              <Text style={styles.cHsn}>{item.hsn}</Text>
              <Text style={styles.cQty}>{item.qty}</Text>
              <Text style={styles.cRate}>{item.rate}</Text>
              <Text style={styles.cRs}>
                {item.amount
                  ? money(parseFloat(item.amount)).split(".")[0]
                  : ""}
              </Text>
              <Text style={styles.cPs}>{item.amount ? "00" : ""}</Text>
            </View>
          ))}
        </View>

        {/* TOTALS + WORDS */}
        <View style={styles.totalsWrap}>
          <View style={styles.wordsBox}>
            <View>
              <Text style={styles.wordsLabel}>Rupees</Text>
              <Text style={styles.wordsText}>
                {grandTotal > 0 ? words : "—"}
              </Text>
            </View>
          </View>
          <View style={styles.totalsBox}>
            <View style={styles.tRowLine}>
              <Text style={{ fontWeight: "bold" }}>Total Value</Text>
              <Text style={{ fontWeight: "bold" }}>{money(totalValue)}</Text>
            </View>
            <View style={styles.tRowLine}>
              <Text>SGST @ {gst.sgst}%</Text>
              <Text>{money(sgstAmt)}</Text>
            </View>
            <View style={styles.tRowLine}>
              <Text>CGST @ {gst.cgst}%</Text>
              <Text>{money(cgstAmt)}</Text>
            </View>
            <View style={styles.tRowLine}>
              <Text>IGST @ {gst.igst}%</Text>
              <Text>{money(igstAmt)}</Text>
            </View>
            <View style={styles.grandRow}>
              <Text>GRAND TOTAL</Text>
              <Text>{money(grandTotal)}</Text>
            </View>
          </View>
        </View>

        {/* TERMS + SIGNATURES */}
        <View style={styles.footerWrap}>
          <View style={styles.termsBox}>
            <View>
              <Text style={styles.termsTitle}>Terms &amp; Conditions :</Text>
              <Text style={styles.termsItem}>
                • Goods once sold cannot be taken back or exchanged.
              </Text>
              <Text style={styles.termsItem}>
                • We will not accept any responsibility or admit any claim
                shortage of goods once leave our place.
              </Text>
              <Text style={styles.termsItem}>
                • All warranties / guaranties to be claimed directly from
                company, we are not liable for the same.
              </Text>
            </View>
            <SignatureBlock
              label="Customer Signature with Seal"
              value={customerSig}
            />
          </View>
          <SignatureBlock label="Authorised Signatory" value={authSig} />
        </View>
      </Page>
    </Document>
  );
}
