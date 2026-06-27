/******************************************************************
 * SiteLogo.gs — โลโก้ระบบ (แสดงหน้าแรก)
 * วางไฟล์นี้เพิ่มใน Apps Script project เดิม (ไฟล์ใหม่ชื่อ SiteLogo.gs)
 * ใช้ readMetaJson / setMetaJson / ok() ที่มีอยู่แล้วในระบบ
 * เก็บแยก key 'siteLogo' ออกจากข้อมูลผู้พัฒนา เพื่อไม่ให้ขนาดเซลล์เกินลิมิต
 ******************************************************************/

// อ่านโลโก้ (สาธารณะ — หน้าแรกเรียกใช้)
function getSiteLogo(p) {
  return ok({ logo: readMetaJson('siteLogo') || '' });
}

// บันทึกโลโก้ (หน้าแอดมิน)
function saveSiteLogo(p) {
  var logo = String((p && p.logo) || '');   // data URL (PNG) หรือว่าง
  setMetaJson('siteLogo', logo);
  return ok({ logo: logo });
}

/******************************************************************
 * เพิ่ม 2 บรรทัดนี้ใน Router.gs (ในกลุ่ม switch(action) เดิม)
 * เช่น วางต่อจากบรรทัด case 'getDeveloper' / 'saveDeveloper'
 *
 *     case 'getSiteLogo':   return getSiteLogo(p);
 *     case 'saveSiteLogo':  return saveSiteLogo(p);
 *
 * จากนั้น Deploy → Manage deployments → Edit → New version
 ******************************************************************/
