const GenderCheckbox = () => {
  return (
    <div className='flex gap-6 mt-3'>
      <label className='flex items-center gap-2 cursor-pointer'>
        <span className='label-text'>Male</span>
        <input
          type='radio'
          name='gender'
          value='male'
          className='radio radio-primary'
        />
      </label>

      <label className='flex items-center gap-2 cursor-pointer'>
        <span className='label-text'>Female</span>
        <input
          type='radio'
          name='gender'
          value='female'
          className='radio radio-primary'
        />
      </label>
    </div>
  );
};

export default GenderCheckbox;
