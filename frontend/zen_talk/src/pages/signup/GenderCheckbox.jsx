const GenderCheckbox = ({ onChange, selectedGender }) => {
  return (
    <div className='flex gap-6 mt-3'>
      <label className={`flex items-center gap-2 cursor-pointer ${selectedGender ==="male" ? "selected" : ""}`}>
        <span className='label-text'>Male</span>
        <input
          type='radio'
          name='gender'
          value='male'
          className='radio radio-primary'
          checked={selectedGender === 'male'}
          onChange={onChange}
        />
      </label>

      <label className={`flex items-center gap-2 cursor-pointer ${selectedGender ==="female" ? "selected" : ""}`}>
        <span className='label-text'>Female</span>
        <input
          type='radio'
          name='gender'
          value='female'
          className='radio radio-primary'
          checked={selectedGender === 'female'}
          onChange={onChange}
        />
      </label>
    </div>
  );
};

export default GenderCheckbox;
