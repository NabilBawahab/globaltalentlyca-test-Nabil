import './App.css';
import { useState } from 'react';

export default function App() {
  const totalStudents = 10;
  const totalAspect = 4;

  const [grade, setGrade] = useState(
    Array.from({ length: totalStudents }, () => Array(totalAspect).fill(1)),
  );

  const [jsonOutput, setJsonOutput] = useState('');

  const handleChange = (studentIndex, aspectIndex, value) => {
    const newGrade = [...grade];
    newGrade[studentIndex][aspectIndex] = parseInt(value);
    setGrade(newGrade);
  };
  const handleSubmit = (submitState) => {
    const output = {};

    Array.from({ length: totalAspect }).forEach((_, indexAspect) => {
      const aspectKey = `aspek_penilaian_${indexAspect + 1}`;
      output[aspectKey] = {};

      grade.forEach((studentGradeList, gradeIndex) => {
        const studentGradeKey = `mahasiswa_${gradeIndex + 1}`;
        output[aspectKey][studentGradeKey] = studentGradeList[indexAspect];
      });
    });

    const stringOutput = JSON.stringify(output, null, 2);

    if (submitState === 'show') {
      console.log(stringOutput);
      setJsonOutput(stringOutput);

      alert('Cek console untuk hasil JSON');
    }

    if (submitState === 'download') {
      const blob = new Blob([stringOutput], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'penilaian-mahasiswa.json';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="container">
      <h2>Aplikasi Penilaian Mahasiswa</h2>
      <div className="table">
        <div className="header">Mahasiswa</div>
        {[...Array(totalAspect)].map((_, index) => (
          <div key={index} className="header">
            Aspek Penilaian {index + 1}
          </div>
        ))}

        {grade.map((items, studentIndex) => (
          <>
            <div className="cell" key={`mhs-${studentIndex}`}>
              Mahasiswa {studentIndex + 1}
            </div>
            {items.map((item, aspectIndex) => (
              <div
                className="cell"
                key={`mhs-${studentIndex}-aspect-${aspectIndex}`}
              >
                <select
                  value={item}
                  onChange={(e) =>
                    handleChange(studentIndex, aspectIndex, e.target.value)
                  }
                >
                  {Array.from({ length: totalStudents }).map((_, index) => (
                    <option key={index + 1} value={index + 1}>
                      {index + 1}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </>
        ))}
      </div>

      <button
        onClick={() => {
          handleSubmit('show');
        }}
      >
        Show data
      </button>
      <button
        onClick={() => {
          handleSubmit('download');
        }}
      >
        Download data
      </button>

      {jsonOutput && (
        <div>
          <h3>Hasil JSON</h3>
          <pre>{jsonOutput}</pre>
        </div>
      )}
    </div>
  );
}
