/**
 * @component fileExtension.js
 * @description 文件判断
 * @time 2018/11/17
 * @author JUSTIN XU
 */
import IconWORD from '../img/fileExtension/attachment-word.png';
import IconTXT from '../img/fileExtension/attachment-txt.png';
import IconRAR from '../img/fileExtension/attachment-rar.png';
import IconPPT from '../img/fileExtension/attachment-ppt.png';
import IconPDF from '../img/fileExtension/attachment-pdf.png';
import IconOther from '../img/fileExtension/attachment-other.png';
import IconEXCEL from '../img/fileExtension/attachment-excel.png';

export const getIamgeByFileExtension = (filePath) => {
  if (!filePath) return null;
  // if (filePath.endsWith('doc')) return IconWORD;
  if (filePath.endsWith('docx')) return IconWORD;
  // if (filePath.endsWith('xls')) return IconEXCEL;
  if (filePath.endsWith('xlsx')) return IconEXCEL;
  if (filePath.endsWith('txt')) return IconTXT;
  if (filePath.endsWith('rar')) return IconRAR;
  if (filePath.endsWith('pdf')) return IconPDF;
  if (filePath.endsWith('ppt')) return IconPPT;
  return IconOther;
};
