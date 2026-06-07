/* student.js — ใช้ร่วมในทุกหน้าโหมด
 * 1) นับวิว (ความนิยม) แบบสาธารณะ
 * 2) ถ้าล็อกอินนักเรียนแล้ว → เติมชื่อให้อัตโนมัติและล็อกไม่ให้แก้
 *    ถ้าไม่ได้ล็อกอิน → ปล่อยให้พิมพ์ชื่อเองได้ตามปกติ (คนทั่วไปก็เล่นได้)
 * ต้องวางหลัง config.js และตั้ง window.PRACTICE_MODE ไว้ก่อน
 */
(function () {
  var KEY = 'mathStudent';

  function getStudent() {
    try { return JSON.parse(localStorage.getItem(KEY) || 'null'); } catch (e) { return null; }
  }
  window.MATH_STUDENT = getStudent();
  window.getMathStudent = getStudent;

  function apiUrl() {
    return (typeof API_URL !== 'undefined' && API_URL && API_URL.indexOf('วาง') === -1) ? API_URL : '';
  }

  // นับวิวสาธารณะ (ไม่บล็อกการทำงาน ผิดพลาดก็ปล่อย)
  function bumpView() {
    var url = apiUrl();
    if (!url || !window.PRACTICE_MODE) return;
    try {
      fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ action: 'bumpView', mode: window.PRACTICE_MODE })
      }).catch(function () {});
    } catch (e) {}
  }

  // ใส่ชื่อในช่อง #nameInput/#rName ตามสถานะล็อกอิน
  // - ล็อกอินแล้ว: เติมชื่อบัญชี + ล็อกแก้ไม่ได้
  // - ยังไม่ล็อกอิน: ใส่ค่า fallback (ชื่อที่เคยพิมพ์) + แก้ไขได้
  function applyName(fallback) {
    var inp = document.getElementById('nameInput') || document.getElementById('rName');
    if (!inp) return;
    var s = getStudent();
    if (s && (s.name || s.fullName)) {
      inp.value = s.name || s.fullName;
      inp.setAttribute('readonly', 'readonly');
      inp.style.opacity = '.85';
      inp.style.cursor = 'default';
      inp.title = 'เล่นในชื่อที่เข้าสู่ระบบ (แก้ไขไม่ได้)';
    } else {
      inp.value = fallback || inp.value || '';
      inp.removeAttribute('readonly');
      inp.style.opacity = '';
      inp.style.cursor = '';
      inp.title = '';
    }
  }
  window.applyMathName = applyName;

  document.addEventListener('DOMContentLoaded', function () {
    bumpView();
    applyName();   // เติม/ล็อกชื่อตามสถานะล็อกอิน
  });
})();
