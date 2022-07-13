export const defaultAvatar =
  "https://as1.ftcdn.net/v2/jpg/03/53/11/00/1000_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg";
export const background =
  "https://png.pngtree.com/thumb_back/fh260/background/20190222/ourmid/pngtree-blue-hospital-medical-western-medicine-poster-background-backgroundmedical-backgrounddoctor-backgroundhospital-image_63770.jpg";
export const bloodGroupData = [
  {
    value: "A+",
    label: "A+",
  },
  {
    value: "A-",
    label: "A-",
  },
  {
    value: "B+",
    label: "B+",
  },
  {
    value: "B-",
    label: "B-",
  },
  {
    value: "O+",
    label: "O+",
  },
  {
    value: "O-",
    label: "O-",
  },
  {
    value: "AB+",
    label: "AB+",
  },
  {
    value: "AB-",
    label: "AB-",
  },
];

export const printableHtmlHeader = `<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
</head>
<body style="text-align: center;">
    <header>
        <div style="display:flex;flex-direction:row;justify-content:space-between;align-items=center;">
        <h3>E-HEALTHCARE</h3>
        <h3>${new Date().toDateString()}</h3></div>
        <hr />
    </header>`;

export const printableHtmlFooter = `<footer style="position:absolute;bottom: 0;width:100%">
<hr />
<div style="display:flex;flex-direction:row;justify-content:space-between;align-items=center;">
    <h3>E-HEALTHCARE</h3>
    <h3>${new Date().toDateString()}</h3></div>
</footer>
</body>
</html>`;
