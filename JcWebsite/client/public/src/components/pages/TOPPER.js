// Search filter functionality
        function searchProfiles() {
            const year = document.getElementById('yearSelect').value;
            const stream = document.getElementById('streamSelect').value;
            const classValue = document.getElementById('classSelect').value;
            
            // Create search criteria object
            const searchCriteria = {
                year: year,
                stream: stream,
                class: classValue
            };
            
            // Filter out empty values
            const activeFilters = Object.entries(searchCriteria)
                .filter(([key, value]) => value !== '')
                .reduce((obj, [key, value]) => {
                    obj[key] = value;
                    return obj;
                }, {});
            
            console.log('Search Criteria:', activeFilters);
            
            // Show search results
            if (Object.keys(activeFilters).length === 0) {
                alert('Please select at least one filter option to search!');
                return;
            }
            
            // Perform actual filtering
            filterProfilesBySearch(activeFilters);
        }

        // Function to filter profiles based on search criteria
        function filterProfilesBySearch(criteria) {
            const profileCards = document.querySelectorAll('.profile-card');
            const grid = document.getElementById('profilesGrid');
            const resultsInfo = document.getElementById('searchResults');
            
            let visibleCount = 0;
            let matchingProfiles = [];
            
            // Add loading effect
            grid.style.opacity = '0.6';
            grid.style.transition = 'opacity 0.3s ease';
            
            setTimeout(() => {
                // Filter profiles
                profileCards.forEach(card => {
                    const cardYear = card.getAttribute('data-year');
                    const cardStream = card.getAttribute('data-stream');
                    const cardClass = card.getAttribute('data-class');
                    
                    let matches = true;
                    
                    // Check each criteria
                    if (criteria.year && cardYear !== criteria.year) {
                        matches = false;
                    }
                    if (criteria.stream && cardStream !== criteria.stream) {
                        matches = false;
                    }
                    if (criteria.class && cardClass !== criteria.class) {
                        matches = false;
                    }
                    
                    // Show/hide based on match
                    if (matches) {
                        card.classList.remove('hidden');
                        card.classList.add('highlighted');
                        visibleCount++;
                        
                        // Get profile info for results
                        const name = card.querySelector('.profile-name').textContent;
                        const details = card.querySelector('.profile-details').textContent;
                        matchingProfiles.push({name, details});
                        
                        // Remove highlight after animation
                        setTimeout(() => {
                            card.classList.remove('highlighted');
                        }, 2000);
                    } else {
                        card.classList.add('hidden');
                    }
                });
                
                // Update results info
                updateSearchResults(criteria, visibleCount, matchingProfiles);
                
                // Reset opacity
                grid.style.opacity = '1';
                
                // Show results section
                resultsInfo.style.display = 'block';
                resultsInfo.scrollIntoView({ behavior: 'smooth', block: 'start' });
                
            }, 500);
        }

        // Update search results display
        function updateSearchResults(criteria, count, profiles) {
            const resultsCount = document.getElementById('resultsCount');
            const activeFilters = document.getElementById('activeFilters');
            
            // Update count
            resultsCount.textContent = `${count} student${count !== 1 ? 's' : ''} found`;
            
            // Update active filters display
            activeFilters.innerHTML = '';
            Object.entries(criteria).forEach(([key, value]) => {
                const filterTag = document.createElement('span');
                filterTag.className = 'filter-tag';
                
                let displayValue = value;
                if (key === 'stream') {
                    displayValue = value.charAt(0).toUpperCase() + value.slice(1);
                } else if (key === 'class') {
                    displayValue = `Class ${value}`;
                }
                
                filterTag.textContent = `${key.charAt(0).toUpperCase() + key.slice(1)}: ${displayValue}`;
                activeFilters.appendChild(filterTag);
            });
        }

        // Clear search filters
        function clearSearch() {
            // Reset all dropdowns
            document.getElementById('yearSelect').value = '';
            document.getElementById('streamSelect').value = '';
            document.getElementById('classSelect').value = '';
            
            // Show all profiles
            const profileCards = document.querySelectorAll('.profile-card');
            profileCards.forEach(card => {
                card.classList.remove('hidden', 'highlighted');
            });
            
            // Hide results info
            document.getElementById('searchResults').style.display = 'none';
            
            // Reset dropdown styles
            const dropdowns = document.querySelectorAll('.search-select');
            dropdowns.forEach(dropdown => {
                dropdown.style.borderColor = '#666';
                dropdown.style.backgroundColor = 'white';
            });
            
            // Smooth scroll back to search section
            document.querySelector('.search-section').scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
        }

        function navigateTo(page) {
            console.log(`Navigating to ${page}`);
            // Add your navigation logic here
        }

        // Profile view functionality
        function viewProfile(profileId) {
            console.log(`Viewing profile: ${profileId}`);
            // Add your profile view logic here
            // alert(`Opening profile: ${profileId}`);
        }

        // Add some interactive effects
        document.addEventListener('DOMContentLoaded', function() {
            // Add hover effects to profile cards
            const profileCards = document.querySelectorAll('.profile-card');
            profileCards.forEach(card => {
                card.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-5px) scale(1.02)';
                });
                
                card.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0) scale(1)';
                });
            });

            // Add click effect to search button
            const searchButton = document.querySelector('.search-btn-main');
            if (searchButton) {
                searchButton.addEventListener('click', function() {
                    this.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        this.style.transform = 'scale(1)';
                    }, 150);
                });
            }
            
            // Add change event listeners to dropdowns for better UX
            const dropdowns = document.querySelectorAll('.search-select');
            dropdowns.forEach(dropdown => {
                dropdown.addEventListener('change', function() {
                    if (this.value) {
                        this.style.borderColor = '#2aff2a';
                        this.style.backgroundColor = '#f0fff0';
                    } else {
                        this.style.borderColor = '#666';
                        this.style.backgroundColor = 'white';
                    }
                });
            });
        });

        // Simulate dynamic content loading
        function loadMoreProfiles() {
            const grid = document.getElementById('profilesGrid');
            const currentCards = grid.children.length;
            
            for (let i = 1; i <= 4; i++) {
                const newCard = document.createElement('div');
                newCard.className = 'profile-card';
                newCard.onclick = () => viewProfile(`profile${currentCards + i}`);
                newCard.innerHTML = `
                    <div class="profile-icon"></div>
                    <div class="profile-name">Name</div>
                `;
                grid.appendChild(newCard);
            }
        }

        // Add keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && e.target.classList.contains('search-btn')) {
                e.target.click();
            }
        });