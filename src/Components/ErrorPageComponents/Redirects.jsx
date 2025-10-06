import React from 'react'

function Redirects() {
   
    return (
        <div className='erorpage-redirects-section-container'>
            <div className="mobile-video">
                <img src='https://d2aq6dqxahe4ka.cloudfront.net/themes/front/page/images/mobile-image.png' />
                <iframe
                    className='video'
                    src="https://www.youtube.com/embed/XMNEDhRoD8g?si=jXpII-6nj43invuN"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                ></iframe>
            </div>
            <div className="redirects-container">
                <div className="redirect">
                    <div className="redirect-leftpart">
                        <img src='https://d2aq6dqxahe4ka.cloudfront.net/themes/front/page/images/check-transparent.png' style={{ width: "30px" }} />
                        <div className="redirect-content">Start A Medical Fundraiser In 5 Minutes</div>
                    </div>
                    <div className="redirect-rightpart">
                        <a href='#'>Know more</a>
                        <div className='redirect-arrow-container'>
                            <img src='https://d2aq6dqxahe4ka.cloudfront.net/themes/front/page/images/right-arrow-transparent.png' style={{ width: '20px' }} />
                        </div>
                    </div>
                </div>
                <div className="redirect">
                    <div className="redirect-leftpart">
                        <img src='https://d2aq6dqxahe4ka.cloudfront.net/themes/front/page/images/check-transparent.png' style={{ width: "30px" }} />
                        <div className="redirect-content">Refer A Deserving Patient</div>
                    </div>
                    <div className="redirect-rightpart">
                        <a href='#'>Know more</a>
                        <div className='redirect-arrow-container'>
                            <img src='https://d2aq6dqxahe4ka.cloudfront.net/themes/front/page/images/right-arrow-transparent.png' style={{ width: '20px' }} />
                        </div>
                    </div>
                </div>
                <div className="redirect">
                    <div className="redirect-leftpart">
                        <img src='https://d2aq6dqxahe4ka.cloudfront.net/themes/front/page/images/check-transparent.png' style={{ width: "30px" }} />
                        <div className="redirect-content">Donate To A Patient In Need</div>
                    </div>
                    <div className="redirect-rightpart">
                        <a href='#'>Know more</a>
                        <div className='redirect-arrow-container'>
                            <img src='https://d2aq6dqxahe4ka.cloudfront.net/themes/front/page/images/right-arrow-transparent.png' style={{ width: '20px' }} />
                        </div>
                    </div>
                </div>
                <div className="redirect">
                    <div className="redirect-leftpart">
                        <img src='https://d2aq6dqxahe4ka.cloudfront.net/themes/front/page/images/check-transparent.png' style={{ width: "30px" }} />
                        <div className="redirect-content">Get all your Questions Answered</div>
                    </div>
                    <div className="redirect-rightpart">
                        <a href='#'>Know more</a>
                        <div className='redirect-arrow-container'>
                            <img src='https://d2aq6dqxahe4ka.cloudfront.net/themes/front/page/images/right-arrow-transparent.png' style={{ width: '20px' }} />
                        </div>
                    </div>
                </div>
                <div className="redirect">
                    <div className="redirect-leftpart">
                        <img src='https://d2aq6dqxahe4ka.cloudfront.net/themes/front/page/images/check-transparent.png' style={{ width: "30px" }} />
                        <div className="redirect-content">Customer Care</div>
                    </div>
                    <div className="redirect-rightpart">
                        <a href='#'>Know more</a>
                        <div className='redirect-arrow-container'>
                            <img src='https://d2aq6dqxahe4ka.cloudfront.net/themes/front/page/images/right-arrow-transparent.png' style={{ width: '20px' }} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Redirects