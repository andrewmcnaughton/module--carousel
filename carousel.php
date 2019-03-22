<section class="block-header-carousel">
    <div class="swiper-container">
        <?php if(have_rows('home_header_carousel')): ?>
            <div class="swiper-wrapper">
                <?php while(have_rows('home_header_carousel')): the_row(); ?>
                    <?php $backgroundImage = get_sub_field('image'); ?>
                    <div class="block-header-carousel__slide swiper-slide" style="background-image: url('<?php echo $backgroundImage['sizes']['header_full']; ?>');"></div>
                <?php endwhile; ?>
            </div>
        <?php endif; ?>
        <div class="swiper-pagination container"></div>
    </div>
    <?php if(!get_field('disable_site', 'options')):?>
        <?php $ticketsButton = get_field('global_tickets_link', 'options'); ?>
        <?php if($ticketsButton): ?>
            <a href="<?php echo $ticketsButton['url']; ?>" class="button button--color--orange" target="<?php echo $ticketsButton['target']; ?>">
                <?php echo $ticketsButton['title']; ?>
                <svg xmlns="http://www.w3.org/2000/svg" width="15.565" height="14.121" viewBox="0 0 15.565 14.121">
                  <g id="Group_26" data-name="Group 26" transform="translate(-573.237 -726.799)">
                    <path id="Path_7" data-name="Path 7" d="M587.822,740.566l6.707-6.707-6.707-6.707" transform="translate(-6.434)" fill="none" stroke="#000" stroke-miterlimit="10" stroke-width="1"/>
                    <line id="Line_2" data-name="Line 2" x1="14.858" transform="translate(573.237 733.859)" fill="none" stroke="#000" stroke-miterlimit="10" stroke-width="1"/>
                  </g>
                </svg>
            </a>
        <?php endif; ?>
    <?php endif; ?>
</section>
