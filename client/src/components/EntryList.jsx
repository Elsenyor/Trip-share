import InfiniteScroll from "react-infinite-scroll-component";
import useEntries from "../hooks/useEntries";
import EntryListItem from "../components/EntryListItem";

const EntryList = () => {
	const { entries, nextPage, currentPage, totalPages, fetchEntries, goToPage } = useEntries();
	return (
		<>
			{entries.length < 1 ? (
				<div className="alert alert-warning text-center">No se ha encontrado ninguna entrada</div>
			) : (
				<InfiniteScroll
					dataLength={entries.length}
					next={() => goToPage(nextPage)}
					hasMore={currentPage < totalPages}
					loader={<h4>Cargando más contenido</h4>}
					endMessage={<h4>Ya no hay más contenido</h4>}
					refreshFunction={() => fetchEntries(1)}
					pullDownToRefresh
					pullDownToRefreshThreshold={50}
					pullDownToRefreshContent={<h3 style={{ textAlign: "center" }}>&#8595; Pull down to refresh</h3>}
					releaseToRefreshContent={<h3 style={{ textAlign: "center" }}>&#8593; Release to refresh</h3>}
				>
					<ul className="row list-unstyled">
						{entries.map((entry) => {
							return (
								<li className="col-12 col-md-6 col-lg-4 mb-4" key={entry.id}>
									<EntryListItem entry={entry} />
								</li>
							);
						})}
					</ul>
				</InfiniteScroll>
			)}
		</>
	);
};

export default EntryList;
