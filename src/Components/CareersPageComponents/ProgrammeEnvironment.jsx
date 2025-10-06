import React from 'react'

function ProgrammeEnvironment() {
    return (
        <div className='container my-5'>
            <h1 className='text-center mb-3' style={{fontWeight:'700'}}>Creating an inclusive environment</h1>
            <div className=' d-flex justify-content-center mb-4 '>
                <p className='text-md-center px-lg-4' style={{width:'700px',fontWeight:'500'}}>We’re dedicated to hiring diverse talent and ensuring that we treat you with respect and support throughout the interview process and once you join Fund for Bharat. We embrace diversity and strive to create conditions that provide everyone with an equal opportunity to thrive. We offer several programmes and initiatives to foster these values.</p>
            </div>

            <div className="row d-flex justify-content-center" style={{fontWeight:'500',rowGap:'40px'}}>
                <div className="col-12 col-lg-5 col-md-6 px-lg-4">
                    <p style={{fontWeight:'700',fontSize:'18px'}}>
                        Diversity, engagement and belonging
                    </p>
                    <p >
                        The Diversity, engagement and belonging (DEB) programme unlocks the potential of all employees by investing in an inclusive community centred on education, introspection, opportunity and growth.
                    </p>

                </div>
                <div className="col-12 col-lg-5 col-md-6 px-lg-4">
                    <p style={{fontWeight:'700',fontSize:'18px'}}>
                        Rising Tides
                    </p>
                    <p>
                        Rising Tides is a six-month sponsorship programme for a talented and diverse group of high performers and emerging leaders at Fund for Bharat who have historically lacked access to this support. Programme participants receive career development training, executive coaching and one-to-one sponsorship from a Fund for Bharat executive team member, with a focus on building a supportive community of peers.
                    </p>
                </div>
                <div className="col-12 col-lg-5 col-md-6 px-lg-4">
                    <p style={{fontWeight:'700',fontSize:'18px'}}>Employee resource groups</p>
                    <p>
                        Employee resource groups (ERGs) support, promote and celebrate groups of employees who have come together around shared characteristics or life experiences.</p>
                </div>
                <div className="col-12 col-lg-5 col-md-6 px-lg-4">
                    <p style={{fontWeight:'700',fontSize:'18px'}}>Partnerships</p>
                    <p>Partnership initiatives, like our collaboration with 
                        <a href="#">The Next Chapter</a>
                        , an apprenticeship programme for formerly incarcerated individuals, underscore Fund for Bharat’s commitment to DEB. Together with 
                        <a href='#'>The Last Mile</a>
                        , The Next Chapter trains and hires 
                        <a href='#'>returning citizens</a>
                        for Fund For Bharat engineering teams.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ProgrammeEnvironment