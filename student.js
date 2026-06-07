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

  // ล็อกชื่อตามบัญชีที่ล็อกอิน + แสดงป้ายเล็ก ๆ ว่ากำลังเล่นในชื่อใคร
  function lockNameField(s) {
    var inp = document.getElementById('nameInput') || document.getElementById('rName');
    if (!inp) return;
    inp.value = s.name || s.fullName || '';
    inp.setAttribute('readonly', 'readonly');
    inp.style.opacity = '.85';
    inp.style.cursor = 'default';
    inp.title = 'เล่นในชื่อที่เข้าสู่ระบบ (แก้ไขไม่ได้)';
  }

  document.addEventListener('DOMContentLoaded', function () {
    bumpView();
    var s = getStudent();
    if (s) lockNameField(s);   // ล็อกอินแล้วเท่านั้นจึงล็อกชื่อ
  });
})();
