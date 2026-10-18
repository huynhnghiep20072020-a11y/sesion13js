let danhSachVe = [
  { pnr: "A123", ten: "Nguyen Van A", hang: "ECONOMY", trangThai: "BOOKED" },
  { pnr: "B456", ten: "Le Thi B", hang: "BUSINESS", trangThai: "BOOKED" },
  { pnr: "C789", ten: "Tran Van C", hang: "ECONOMY", trangThai: "BOOKED" }
];

function main() {
  let chay = true;
  do {
    console.log("=== QUAY CHECK-IN ===");
    console.log("1. Hien thi danh sach ve");
    console.log("2. Check-in va can hanh ly");
    console.log("3. Tra cuu ve");
    console.log("4. Huy ve");
    console.log("5. Thoat");

    let luaChon = prompt("Chon tinh nang (1-5):");
    let so = Number(luaChon);

    switch (so) {
      case 1:
        hienThiVe();
        break;
      case 2:
        checkIn();
        break;
      case 3:
        timVe();
        break;
      case 4:
        huyVe();
        break;
      case 5:
        chay = false;
        console.log("Da thoat chuong trinh");
        break;
      default:
        console.log("Chon sai roi, hay chon lai");
    }
  } while (chay === true);
}

function findTicketByPnr(maPnr) {
  for (let i = 0; i < danhSachVe.length; i++) {
    if (danhSachVe[i].pnr === maPnr) {
      return danhSachVe[i];
    }
  }
  return null;
}

function calculateExcessBaggageFee(hang, soKy) {
  let mienPhi = 0;
  if (hang === "ECONOMY") {
    mienPhi = 20;
  } else if (hang === "BUSINESS") {
    mienPhi = 30;
  }

  if (soKy > mienPhi) {
    let vuot = soKy - mienPhi;
    return vuot * 50000;
  }
  return 0;
}

function displayBoardingPass(ve, phi) {
  console.log("--- BOARDING PASS ---");
  console.log("Ma PNR: " + ve.pnr);
  console.log("Ten: " + ve.ten);
  console.log("Hang: " + ve.hang);
  console.log("Trang thai: " + ve.trangThai);
  console.log("Phi hanh ly phat sinh: " + phi + " VND");
  console.log("---------------------");
}

function checkIn() {
  let maPnr = prompt("Nhap ma PNR de check-in:");
  let ve = findTicketByPnr(maPnr);

  if (ve === null) {
    console.log("Khong tim thay ve");
    return;
  }

  if (ve.trangThai !== "BOOKED") {
    console.log("Ve nay khong the check-in");
    return;
  }

  let nhapKy = prompt("Nhap so ky hanh ly (kg):");
  let soKy = Number(nhapKy);

  if (soKy < 0) {
    console.log("So ky khong duoc am");
    return;
  }

  let phi = calculateExcessBaggageFee(ve.hang, soKy);
  ve.trangThai = "CHECKED_IN";

  displayBoardingPass(ve, phi);
}

function huyVe() {
  let maPnr = prompt("Nhap ma PNR can huy:");
  let ve = findTicketByPnr(maPnr);

  if (ve !== null) {
    ve.trangThai = "CANCELLED";
    console.log("Da huy ve thanh cong");
  } else {
    console.log("Khong tim thay ve");
  }
}

function hienThiVe() {
  console.table(danhSachVe);
}

function timVe() {
  let maPnr = prompt("Nhap ma PNR can tim:");
  let ve = findTicketByPnr(maPnr);

  if (ve !== null) {
    console.log(ve);
  } else {
    console.log("Khong tim thay ve");
  }
}

main();