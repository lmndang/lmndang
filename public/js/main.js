//============ Navigation menu ============//
(() =>
{
    const hamburgerBtn = document.querySelector(".hamburger-btn");
    const navMenu = document.querySelector(".nav-menu");
    const closeNavBtn = navMenu.querySelector(".close-nav-menu");

    hamburgerBtn.addEventListener("click", showNavMenu);
    closeNavBtn.addEventListener("click", hideNavMenu);

    function showNavMenu()
    {
        navMenu.classList.add("open");
        bodyScrollingToggle();
    }

    function hideNavMenu()
    {
        navMenu.classList.remove("open");
        fadeOutEffect();
        bodyScrollingToggle();
    }

    function fadeOutEffect()
    {
        document.querySelector(".fade-out-effect").classList.add("active");

        setTimeout(() =>
        {
            document.querySelector(".fade-out-effect").classList.remove("active");
        }, 300);
    }

    //Attach an event handler to document
    document.addEventListener("click", (event)=>
    {
        if(event.target.classList.contains("link-item"))
        {
            //Make sure event.target.hash has a value before overridding default behavior 
            if(event.target.hash != "")
            {
                //Prevent default anchor click behavior
                event.preventDefault();
                const hash = event.target.hash;
                
                //Deactivate existing active 'section'
                document.querySelector(".section.active").classList.add("hide");
                document.querySelector(".section.active").classList.remove("active");

                //Activate new 'section'
                document.querySelector(hash).classList.add("active");
                document.querySelector(hash).classList.remove("hide");

                //Deactivate existing active navigation menu 'link-item'
                navMenu.querySelector(".active").classList.add("outer-shadow", "hover-in-shadow");
                navMenu.querySelector(".active").classList.remove("active", "inner-shadow");

                //If clicked 'linked-item' is contained within the navigation menu
                if(navMenu.classList.contains("open"))
                {
                    //Activate new navigation menu 'link-item'
                    event.target.classList.add("active", "inner-shadow");
                    event.target.classList.remove("outer-shadow", "hover-in-shadow");

                    //Hide navigation menu
                    hideNavMenu();
                }
                else
                {
                    let navItem = navMenu.querySelectorAll(".link-item");
                    navItem.forEach((item) =>
                    {
                        if(hash===item.hash)
                        {
                            //Activate new navigation menu 'link-item'
                            item.classList.add("active", "inner-shadow");
                            item.classList.remove("outer-shadow", "hover-in-shadow");
                        }

                        fadeOutEffect();
                    });
                }

                window.location.hash = hash;
            }
        }
    });
})();

//============ About section tabs ============//
(() =>
{
    const aboutSection = document.querySelector(".about-section");

    const tabsContainer = document.querySelector(".about-tabs");

    tabsContainer.addEventListener("click", (event) =>
    {
        //Choose tab-item don't have active class
        if(event.target.classList.contains("tab-item") && !event.target.classList.contains("active"))
        {
            const target = event.target.getAttribute("data-target");

            //deactivate existing active "tab-item"
            tabsContainer.querySelector(".active").classList.remove("outer-shadow", "active");

            //activate new "tab-item"
            event.target.classList.add("outer-shadow", "active");

            //deactivate existing active "tab-content"
            aboutSection.querySelector(".tab-content.active").classList.remove("active");

            //activate new "tab-content"
            aboutSection.querySelector(target).classList.add("active");

        }
    });
})();

function bodyScrollingToggle()
{
    document.body.classList.toggle("hiden-scrolling");
}

//============ Portfolio filter and popup ============//
(() =>
{
    const filterContainer = document.querySelector(".portfolio-filter");
    const portfolioItemsContainer = document.querySelector(".portfolio-items");
    const portfolioItems = document.querySelectorAll(".portfolio-item");

    const popup = document.querySelector(".portfolio-popup");

    const prevBtn = popup.querySelector(".pp-prev");
    const nextBtn = popup.querySelector(".pp-next");
    const closeBtn = popup.querySelector(".pp-close");

    const projectDetailsContainer = popup.querySelector(".pp-details");
    const projectDetailsBtn = popup.querySelector(".pp-project-details-btn");

    let itemIndex, slideIndex, screenshots;

    // Filter portfolio items
    filterContainer.addEventListener("click", (event) =>
    {
        if(event.target.classList.contains("filter-item") && !event.target.classList.contains("active"))
        {
            //deactivate existing active "filter-item"
            filterContainer.querySelector(".active").classList.remove("outer-shadow", "active");

            //activate new "filter-item"
            event.target.classList.add("outer-shadow", "active");
            const target = event.target.getAttribute("data-target");
            portfolioItems.forEach((item)=>
            {
                if(target === item.getAttribute("data-category") || target === "all")
                {
                    item.classList.remove("hide");
                    item.classList.add("show");
                }
                else
                {
                    item.classList.remove("show");
                    item.classList.add("hide");
                }
            });
        }
    });

    portfolioItemsContainer.addEventListener("click", (event) =>
    {
        if(event.target.closest(".portfolio-item-inner"))
        {
            const portfolioItem = event.target.closest(".portfolio-item-inner").parentElement;
            
            //Get the portfolioItem index
            itemIndex = Array.from(portfolioItem.parentElement.children).indexOf(portfolioItem);
            
            screenshots = portfolioItems[itemIndex].querySelector(".portfolio-item-img img").getAttribute("data-screenshots");

            //Convert screenshots into array
            screenshots = screenshots.split(",");

            for(let i = 0; i < screenshots.length; i++)
            {
                screenshots[i] = screenshots[i].replace(/\s+/g, "");
            }

            if(screenshots.length === 1)
            {
                prevBtn.style.display = "none";
                nextBtn.style.display = "none";
            }
            else
            {
                prevBtn.style.display = "block";
                nextBtn.style.display = "block";
            }

            slideIndex = 0;
            popupToggle();
            popupSlideshow();
            popupDetails();
        }    
    });

    closeBtn.addEventListener("click", () =>
    {
        popupToggle();
        if(projectDetailsContainer.classList.contains("active"))
        {
            popupDetailsToggle();
        }
    });

    function popupToggle()
    {
        popup.classList.toggle("open");
        bodyScrollingToggle();
    }

    function popupSlideshow()
    {
        const imgSrc = screenshots[slideIndex];
        const poupImg = popup.querySelector(".pp-img");
        
        //Activate loader until the popupImg loaded
        popup.querySelector(".pp-loader").classList.add("active");
        poupImg.src = imgSrc;
        poupImg.onload = () =>
        {
            //Deactivate loader after the popupImg loaded
            popup.querySelector(".pp-loader").classList.remove("active");
        }

        popup.querySelector(".pp-counter").innerHTML = (slideIndex + 1) + " of " + screenshots.length;
    }

    //Next slide
    nextBtn.addEventListener("click", () => 
    {
        if(slideIndex === screenshots.length-1)
        {
            slideIndex = 0;
        }
        else
        {
            slideIndex++;
        }
        popupSlideshow();
    });

    //PrevBtn slide
    prevBtn.addEventListener("click", () => 
    {
        if(slideIndex === 0)
        {
            slideIndex = screenshots.length - 1;
        }
        else
        {
            slideIndex--;
        }
        popupSlideshow();
    });

    function popupDetails()
    {
        //if details is null - not exist:
        if(!portfolioItems[itemIndex].querySelector(".portfolio-item-details"))
        {
            projectDetailsBtn.style.display="none";
            return; //exit function
        }
        // Get the project details
        projectDetailsBtn.style.display="block";

        const details = portfolioItems[itemIndex].querySelector(".portfolio-item-details").innerHTML;
        popup.querySelector(".pp-project-details").innerHTML = details;
        
        //Set the project details
        const title = portfolioItems[itemIndex].querySelector(".portfolio-item-title").innerHTML;
        popup.querySelector(".pp-title h2").innerHTML = title;

        const category = portfolioItems[itemIndex].getAttribute("data-category");
        popup.querySelector(".pp-project-category").innerHTML = category.split("-").join(" ");
    }

    projectDetailsBtn.addEventListener("click", (event) =>
    {
        popupDetailsToggle();
    });

    function popupDetailsToggle()
    {
        if(projectDetailsContainer.classList.contains("active"))
        {
            projectDetailsBtn.querySelector("i").classList.add("fa-plus");
            projectDetailsBtn.querySelector("i").classList.remove("fa-minus");

            projectDetailsContainer.classList.remove("active");
            projectDetailsContainer.style.maxHeight = 0 + "px";
        }
        else
        {
            projectDetailsBtn.querySelector("i").classList.remove("fa-plus");
            projectDetailsBtn.querySelector("i").classList.add("fa-minus");

            projectDetailsContainer.classList.add("active");
            projectDetailsContainer.style.maxHeight = projectDetailsContainer.scrollHeight + "px";
            popup.scrollTo(0, projectDetailsContainer.offsetTop);
        }
    }

})();


//============ Testimonial Slider ============//


//============ Hide all sections except active ============//
(() =>
{
    const sections = document.querySelectorAll(".section");
    sections.forEach((section) =>
    {
        if(!section.classList.contains("active"))
        {
            section.classList.add("hide");
        }
    });
})();


window.addEventListener("load", () =>
{
    //preloader
    document.querySelector(".preloader").classList.add("fade-out");

    setTimeout(() =>
    {
        document.querySelector(".preloader").style.display = "none";
    }, 600);
});