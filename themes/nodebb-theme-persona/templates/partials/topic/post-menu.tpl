<span component="post/tools" class="dropdown moderator-tools bottom-sheet <!-- IF !posts.display_post_menu -->hidden<!-- ENDIF !posts.display_post_menu -->">
    <a href="#" data-toggle="dropdown" data-ajaxify="false"><i class="fa fa-fw fa-ellipsis-v"></i></a>
    <ul class="dropdown-menu dropdown-menu-right" role="menu">
        <li>
            <a component="post/endorse" role="menuitem" tabindex="-1" href="#" data-endorsed="{posts.endorsed}">
                <span class="menu-icon">
                    <i component="post/endorse/on" class="fas fa-check-circle <!-- IF posts.endorsed -->hidden<!-- ENDIF posts.endorsed -->"></i>
                    <i component="post/endorse/off" class="fas fa-circle <!-- IF !posts.endorsed -->hidden<!-- ENDIF posts.endorsed -->"></i>
                </span>
                <span component="post/endorse/on" class="endorse-text <!-- IF posts.endorsed -->hidden<!-- ENDIF posts.endorsed -->">Mark Post as Correct</span>
                <span component="post/endorse/off" class="endorse-text <!-- IF !posts.endorsed -->hidden<!-- ENDIF posts.endorsed -->">Unmark Post</span>
            </a>
        </li>
    </ul>
</span>
